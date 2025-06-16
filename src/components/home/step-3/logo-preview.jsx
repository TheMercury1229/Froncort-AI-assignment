import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading";

export const LogoPreview = ({ generatedSVG, loading, companyName }) => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-center">
            {companyName ? `${companyName} Logo` : "Generated Logo"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64 rounded-lg bg-gray-50 relative">
            {loading ? (
              <LoadingSpinner text="Generating logo..." />
            ) : generatedSVG ? (
              <div
                id="generated-logo"
                className="flex justify-center items-center p-4 bg-white rounded-md shadow-sm w-full h-full"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: generatedSVG }}
                  className="max-w-full max-h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto"
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No logo generated yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
