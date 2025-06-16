import { Card, CardContent } from "@/components/ui/card";

export const ErrorCard = ({ error }) => {
  if (!error) return null;

  return (
    <Card className="bg-background ">
      <CardContent className="pt-6">
        <p className="text-red-600 text-sm">{error}</p>
      </CardContent>
    </Card>
  );
};
