import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Todo App" }];
};

export default function Index() {
  return <div>Profile</div>;
}
