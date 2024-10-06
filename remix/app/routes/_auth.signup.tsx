import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { Input } from "~/components/ui";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";

export const meta: MetaFunction = () => {
  return [{ title: "Todo App" }];
};

export default function Index() {
  return (
    <>
      <Card className="rounded-none shadow-md">
        <CardContent className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-primary">Todo App</h1>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>サインアップ</CardTitle>
            <CardDescription>
              新しいアカウントを作成してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    <li>エラーです</li>
                    {/* {Object.values(actionData.errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))} */}
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  aria-invalid
                  aria-describedby="username-error"
                />
                <p className="text-sm text-red-500" id="username-error">
                  入力してください
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
            </Form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              アカウント作成
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
