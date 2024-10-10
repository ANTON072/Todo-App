import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { COGNITO_CONFIG } from "~/config/cognito.server";
import { getUserId, setFlashMessage } from "~/lib/session.server";
import { getCognitoClient } from "~/lib/cognito-client.server";

export async function action({ request }: ActionFunctionArgs) {
  const cognitoClient = getCognitoClient();

  const formData = await request.formData();
  const verificationCode = formData.get("verificationCode") as string;
  const userId = formData.get("userId") as string;

  try {
    const command = new ConfirmSignUpCommand({
      ClientId: COGNITO_CONFIG.CLIENT_ID,
      Username: userId,
      ConfirmationCode: verificationCode,
    });
    await cognitoClient.send(command);
    return setFlashMessage(request, "アカウントを作成しました。", "/login");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "認証に失敗しました";
    return json(
      {
        error: errorMessage,
      },
      { status: 400 },
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/signup");
  }
  return { userId };
}

export default function SignupVerify() {
  const actionData = useActionData<typeof action>();
  const { userId } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>アカウント確認</CardTitle>
          <CardDescription>
            メールに送信された6桁の確認コードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            {actionData?.error && (
              <Alert variant="destructive">
                <AlertDescription>{actionData?.error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">確認コード</Label>
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="000000"
                  required
                  maxLength={6}
                />
              </div>
              <input type="hidden" name="userId" value={userId} />
              <Button type="submit" className="w-full">
                確認
              </Button>
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Alert>
            <AlertDescription>
              確認コードの有効期限は24時間です。
            </AlertDescription>
          </Alert>
          <Button variant="link" className="px-0">
            確認コードを再送信
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
