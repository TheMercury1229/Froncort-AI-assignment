import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWizard } from "react-use-wizard";
import { StepLayout } from "@/components/layouts/step-layout";
import { Star } from "lucide-react";

import { iconOptions } from "@/data/index";

import { generateSVG } from "@/store/slices/operationSlice";

import { StepHeader } from "@/components/home/step-2/heading";
import { ErrorCard } from "@/components/home/step-2/error-card";
import { DesignConfigCard } from "@/components/home/step-2/design-config";
import { NavigationButtons } from "@/components/home/step-2/navigation-button";
import { ContentCard } from "@/components/home/step-2/content";
export const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  const dispatch = useDispatch();
  const logoConfig = useSelector((state) => state.logo);
  const { loading, error } = useSelector((state) => state.logoOps);

  const { selectedIcon } = logoConfig;

  const IconComponent =
    iconOptions.find((icon) => icon.value === selectedIcon)?.icon || Star;
  // Handle logo generation
  const handleGenerateLogo = async () => {
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
        <StepHeader />
        <ErrorCard error={error} />
        {/* Content displayed */}
        <div className="grid md:grid-cols-2 gap-4">
          <DesignConfigCard
            logoConfig={logoConfig}
            IconComponent={IconComponent}
          />
          <ContentCard logoConfig={logoConfig} />
        </div>
        <NavigationButtons
          onPrevious={previousStep}
          onGenerate={handleGenerateLogo}
          loading={loading}
        />
      </div>
    </StepLayout>
  );
};
