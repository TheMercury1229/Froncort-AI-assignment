"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const NavigationButtons = ({ onPrevious, onReset, loading }) => {
  const handleReset = () => {
    onReset();
  };

  return (
    <div className="flex justify-between pt-4 flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Preview
      </Button>

      <Button
        onClick={handleReset}
        variant="outline"
        className="flex items-center gap-2"
        disabled={loading}
      >
        Create New Logo
      </Button>
    </div>
  );
};
