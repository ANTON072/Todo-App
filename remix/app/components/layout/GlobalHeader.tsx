import { Card, CardContent } from "../ui/card";

export const GlobalHeader = () => {
  return (
    <Card className="rounded-none shadow-md">
      <CardContent className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-primary">Todo App</h1>
      </CardContent>
    </Card>
  );
};
