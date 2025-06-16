import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWizard } from "react-use-wizard";
import { StepLayout } from "@/components/layouts/step-layout";
import { generateSVG, resetLogo } from "@/store/slices/operationSlice";
import { resetForm } from "@/store/slices/logoSlice";
import { LogoPreview } from "@/components/home/step-3/logo-preview";
import { LogoActions } from "@/components/home/step-3/logo-actions";
import { NavigationButtons } from "@/components/home/step-3/navigation-buttons";
import { toast } from "sonner";

export const Step3 = () => {
  const { previousStep, goToStep } = useWizard();
  const dispatch = useDispatch();

  const logoConfig = useSelector((state) => state.logo);
  const { generatedSVG, loading, error } = useSelector(
    (state) => state.logoOps
  );

  // Handle toast notifications
  useEffect(() => {
    if (error) {
      toast.error("Logo generation failed", {
        description: error,
        action: {
          label: "Try Again",
          onClick: handleRegenerateLogo,
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (generatedSVG && !loading && !error) {
      toast.success("Logo generated successfully!", {
        description: "You can now download, bookmark, or regenerate your logo.",
      });
    }
  }, [generatedSVG, loading, error]);

  const handleRegenerateLogo = async () => {
    try {
      await dispatch(generateSVG(logoConfig));
    } catch (err) {
      console.error("Logo regeneration failed:", err);
    }
  };

  const handleReset = () => {
    dispatch(resetLogo());
    toast.info("Starting fresh", {
      description: "Ready to create a new logo from scratch.",
    });
    dispatch(resetForm()); // Reset the form state
    goToStep(0); // Navigate back to the first step
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Your Generated Logo</h2>
          <p className="text-muted-foreground">
            Here's your AI-generated logo. You can download, bookmark, or
            regenerate it.
          </p>
        </div>

        {/* Logo Preview */}
        <LogoPreview
          generatedSVG={generatedSVG}
          loading={loading}
          companyName={logoConfig.companyName}
        />

        {/* Action Buttons */}
        {generatedSVG && !loading && (
          <LogoActions onRegenerate={handleRegenerateLogo} loading={loading} />
        )}

        {/* Navigation */}
        <NavigationButtons
          onPrevious={previousStep}
          onReset={handleReset}
          loading={loading}
        />
      </div>
    </StepLayout>
  );
};
