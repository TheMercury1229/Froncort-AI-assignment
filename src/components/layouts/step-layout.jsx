import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const StepLayout = ({ children }) => {
  return (
    <Card className="flex  lg:w-full lg:max-w-7xl p-2  lg:p-4 flex-col gap-4">
      <CardContent className={"flex flex-col gap-4"}>{children}</CardContent>
    </Card>
  );
};
