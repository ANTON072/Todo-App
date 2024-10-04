import { redirect } from "@remix-run/react";

export function action() {
  return { redirect: "/login" };
}

export async function loader() {
  return redirect("/");
}
