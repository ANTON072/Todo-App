import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import {
  SignUpCommand,
  UsernameExistsException,
} from "@aws-sdk/client-cognito-identity-provider";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { COGNITO_CONFIG } from "~/config/cognito.server";
import { createUserSession } from "~/lib/session.server";
import { getCognitoClient } from "~/lib/cognito-client.server";

export const meta: MetaFunction = () => {
  return [{ title: "Todo App" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const cognitoClient = getCognitoClient();

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const command = new SignUpCommand({
      ClientId: COGNITO_CONFIG.CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "name",
          Value: name,
        },
      ],
    });
    await cognitoClient.send(command);
    return createUserSession(email, "/signup/verify");
  } catch (error) {
    const response = {
      error: "サインアップに失敗しました。もう一度お試しください。",
      exists: false,
    };
    if (error instanceof Error) {
      response.error = error.message;
    }
    if (error instanceof UsernameExistsException) {
      response.exists = true;
    }
    return json(response, {
      status: 400,
    });
  }
};

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>サインアップ</CardTitle>
            <CardDescription>
              サインアップ後、確認コードを入力するページに移動します。メールをご確認ください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              {actionData?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{actionData?.error}</AlertDescription>
                  {actionData?.exists && (
                    <AlertDescription>
                      <Link className="link-underline" to="/signup/verify">
                        認証コードを再発行する
                      </Link>
                    </AlertDescription>
                  )}
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" aria-required>
                  メールアドレス
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" aria-required>
                  ユーザー名
                </Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting"
                  ? "処理中..."
                  : "アカウント作成"}
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
