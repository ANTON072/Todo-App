import { Form } from "@remix-run/react";

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

export default function SignupVerify() {
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
