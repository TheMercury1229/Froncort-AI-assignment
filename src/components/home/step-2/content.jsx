import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ContentCard = ({ logoConfig }) => {
  const { companyName, description } = logoConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <span className="text-md font-medium">Company Name:</span>
          <p className="text-md text-muted-foreground mt-1">
            {companyName || "Not specified"}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium">Description:</span>
          <p className="text-sm text-muted-foreground mt-1">
            {description || "Not specified"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
