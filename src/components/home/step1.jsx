"use client";
import React from "react";
import { StepLayout } from "@/components/layouts/step-layout";
import { LogoGeneratorForm } from "@/components/home/step-1/logo-form";

export const Step1 = () => {
  return (
    <StepLayout>
      <LogoGeneratorForm />{" "}
    </StepLayout>
  );
};
