import { createCookieSessionStorage, redirect } from "@remix-run/node";

// セッションストレージの設定
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true, // クライアント側からのアクセスを禁止
    secrets: ["s3cr3t"], // クッキーの署名に使用する秘密鍵
    secure: process.env.NODE_ENV === "production", // HTTPS接続時のみ有効
  },
});

// セッションの取得
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

// セッションの作成と保存
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

// セッションからユーザーIDを取得
export async function getUserId(request: Request) {
  const session = await getSession(request);
  const userId = await session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

// ログアウト処理
export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

// フラッシュメッセージの設定
export async function setFlashMessage(
  request: Request,
  message: string,
  redirectTo: string,
) {
  const session = await getSession(request);
  session.flash("message", message); // 次にリクエストされるまで有効
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}
