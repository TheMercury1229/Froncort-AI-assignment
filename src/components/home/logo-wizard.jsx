"use client";
import React from "react";
import { Wizard } from "react-use-wizard";
import { Step1 } from "@/components/home/step1";
import { Step2 } from "@/components/home/step2";
import { Step3 } from "@/components/home/step3";

export const LogoWizard = () => {
  return (
    <Wizard>
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard>
  );
};
