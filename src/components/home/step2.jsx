import React from "react";
import { useSelector } from "react-redux";
import { useWizard } from "react-use-wizard";
import { StepLayout } from "@/components/layouts/step-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Sparkles,
  Star,
  Circle,
  Square,
  Triangle,
} from "lucide-react";
import { iconOptions, shapeOptions } from "@/data/index";

export const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  const logoConfig = useSelector((state) => state.logo);

  const {
    primaryColor,
    fontStyle,
    selectedIcon,
    logoShape,
    layoutType,
    companyName,
    description,
  } = logoConfig;

  const IconComponent = iconOptions[selectedIcon] || Star;

  return (
    <StepLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold  mb-2">Logo Preview</h2>
          <p className="text-muted-foreground text-sm">
            Review your logo configuration before generating with AI
          </p>
        </div>
        {/* Configuration Summary */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Primary Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <Badge variant="secondary">{primaryColor}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Font Style:</span>
                <Badge variant="outline" style={{ fontFamily: fontStyle }}>
                  {fontStyle}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Icon:</span>
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <Badge variant="outline">{selectedIcon}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Shape:</span>
                <Badge variant="outline">{logoShape}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Layout:</span>
                <Badge variant="outline">{layoutType.replace("-", " ")}</Badge>
              </div>
            </CardContent>
          </Card>

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
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={previousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Configuration
          </Button>

          <Button
            onClick={nextStep}
            size={"lg"}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Sparkles className="w-4 h-4" />
            Generate Logo with AI
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};
