import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWizard } from "react-use-wizard";
import { StepLayout } from "@/components/layouts/step-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Star, Loader2 } from "lucide-react";
import { iconOptions } from "@/data/index";
import { generateSVG } from "@/store/slices/operationSlice"; // Import the async thunk

export const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  const dispatch = useDispatch();
  const logoConfig = useSelector((state) => state.logo);
  const { loading, error } = useSelector((state) => state.logoOps);

  const {
    primaryColor,
    fontStyle,
    selectedIcon,
    logoShape,
    layoutType,
    companyName,
    description,
  } = logoConfig;

  const IconComponent =
    iconOptions.find((icon) => icon.value === selectedIcon)?.icon || Star;

  // Validation function
  const isConfigurationValid = () => {
    return (
      companyName?.trim() &&
      primaryColor &&
      fontStyle &&
      selectedIcon &&
      logoShape &&
      layoutType
    );
  };

  // Handle logo generation
  const handleGenerateLogo = async () => {
    if (!isConfigurationValid()) {
      return;
    }

    try {
      // Dispatch the generateSVG async thunk
      const result = await dispatch(generateSVG(logoConfig));

      // If generation was successful, move to next step
      if (generateSVG.fulfilled.match(result)) {
        nextStep();
      }
    } catch (err) {
      console.error("Logo generation failed:", err);
    }
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Logo Preview</h2>
          <p className="text-muted-foreground text-sm">
            Review your logo configuration before generating with AI
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-300">
            <CardContent className="pt-6">
              <p className="text-red-600 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

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

        {/* Validation Warning */}
        {!isConfigurationValid() && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <p className="text-yellow-700 text-sm">
                Please ensure all required fields are filled out before
                generating your logo.
                {!companyName?.trim() && " Company name is required."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Configuration
          </Button>

          <Button
            onClick={handleGenerateLogo}
            size="lg"
            disabled={loading || !isConfigurationValid()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? "Generating..." : "Generate Logo with AI"}
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};
