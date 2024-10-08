import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import {
  SignUpCommand,
  CognitoIdentityProviderClient,
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

export const meta: MetaFunction = () => {
  return [{ title: "Todo App" }];
};

const cognitoClient = new CognitoIdentityProviderClient({
  region: COGNITO_CONFIG.REGION,
});

export const action = async ({ request }: ActionFunctionArgs) => {
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
    return json({ success: true, error: null });
  } catch (error) {
    console.error("Error during signup:", error);
    let errorMessage = "サインアップに失敗しました。もう一度お試しください。";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return json({
      error: errorMessage,
      success: false,
    });
  }
};

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>サインアップ</CardTitle>
            <CardDescription>
              新しいアカウントを作成してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              {actionData?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{actionData?.error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" aria-required>
                  ユーザー名
                </Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" aria-required>
                  メールアドレス
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                アカウント作成
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
