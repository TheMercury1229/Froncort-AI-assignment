"use client";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "@/store/slices/logoSlice";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  colorPalette,
  fontOptions,
  iconOptions,
  layoutOptions,
  shapeOptions,
} from "@/data";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/home/heading";
import { toast } from "sonner";
import { useWizard } from "react-use-wizard";
import { useState } from "react";

const FormField = ({ label, children, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    <Label className="text-sm font-medium">{label}</Label>
    {children}
  </div>
);

export const LogoGeneratorForm = () => {
  const dispatch = useDispatch();
  const companyName = useSelector((state) => state.logo.companyName);
  const description = useSelector((state) => state.logo.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { nextStep } = useWizard();
  const handleSubmit = (e) => {
    // Validate form fields
    e.preventDefault();
    setIsSubmitting(true);
    if (!companyName || !description) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    nextStep(); // Go to the next step
    toast.success("Logo configuration saved successfully!");

    // Go to the next step for
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <div className=" py-2 px-2 lg:px-4">
      <Heading />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Column - Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Logo Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField label="Company Name *">
              <Input
                type="text"
                value={companyName}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "companyName",
                      value: e.target.value,
                    })
                  )
                }
                disabled={isSubmitting}
                placeholder="Enter your company name"
              />
            </FormField>

            <FormField label="Company Description *">
              <Textarea
                value={description}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "description",
                      value: e.target.value,
                    })
                  )
                }
                placeholder="Describe your company, values, and what makes it unique..."
                rows={4}
                className="resize-none"
                disabled={isSubmitting}
              />
            </FormField>

            <FormField label="Primary Color">
              <ColorPicker />
            </FormField>

            <FormField label="Font Style">
              <FontSelector />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField label="Icon">
              <IconSelector />
            </FormField>

            <FormField label="Logo Shape">
              <ShapeSelector />
            </FormField>

            <FormField label="Layout Type">
              <LayoutSelector />
            </FormField>

            {/* Action Buttons */}
            <div className="pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Generate Logo
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
// Form field
const ColorPicker = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state.logo.primaryColor);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={primaryColor}
          onChange={(e) =>
            dispatch(
              updateField({ field: "primaryColor", value: e.target.value })
            )
          }
          placeholder="#000000"
          className="flex-1"
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        {colorPalette.map((color) => (
          <Button
            key={color}
            variant="outline"
            size="sm"
            className={`w-8 h-8 p-0 rounded-full border-2 ${
              primaryColor === color
                ? "border-foreground scale-120"
                : "border-muted"
            } transition-all duration-200 hover:scale-110`}
            style={{ backgroundColor: color }}
            onClick={() =>
              dispatch(updateField({ field: "primaryColor", value: color }))
            }
          />
        ))}
        <div className="relative">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) =>
              dispatch(
                updateField({ field: "primaryColor", value: e.target.value })
              )
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 rounded-full border-2 border-dashed border-muted-foreground hover:border-foreground transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FontSelector = () => {
  const dispatch = useDispatch();
  const fontStyle = useSelector((state) => state.logo.fontStyle);

  return (
    <Select
      value={fontStyle}
      onValueChange={(value) =>
        dispatch(updateField({ field: "fontStyle", value }))
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a font" />
      </SelectTrigger>
      <SelectContent>
        {fontOptions.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const IconSelector = () => {
  const dispatch = useDispatch();
  const selectedIcon = useSelector((state) => state.logo.selectedIcon);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {iconOptions.map((icon) => {
        const IconComponent = icon.icon;
        return (
          <Button
            key={icon.value}
            variant={selectedIcon === icon.value ? "default" : "outline"}
            size="lg"
            className="flex flex-col h-auto p-3 space-y-1"
            onClick={() =>
              dispatch(
                updateField({ field: "selectedIcon", value: icon.value })
              )
            }
          >
            <IconComponent className="w-6 h-6" />
            <span className="text-xs">{icon.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

const ShapeSelector = () => {
  const dispatch = useDispatch();
  const logoShape = useSelector((state) => state.logo.logoShape);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {shapeOptions.map((shape) => {
        const ShapeIcon = shape.icon;
        return (
          <Button
            key={shape.value}
            variant={logoShape === shape.value ? "default" : "outline"}
            size="lg"
            className="flex flex-col h-auto p-3 space-y-1"
            onClick={() =>
              dispatch(updateField({ field: "logoShape", value: shape.value }))
            }
          >
            {ShapeIcon ? (
              <ShapeIcon className="w-6 h-6" />
            ) : (
              <div className="w-6 h-6 flex items-center justify-center text-muted-foreground">
                ×
              </div>
            )}
            <span className="text-xs">{shape.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

const LayoutSelector = () => {
  const dispatch = useDispatch();
  const layoutType = useSelector((state) => state.logo.layoutType);

  return (
    <RadioGroup
      value={layoutType}
      onValueChange={(value) =>
        dispatch(updateField({ field: "layoutType", value }))
      }
      className="space-y-3"
    >
      {layoutOptions.map((layout) => (
        <div key={layout.value} className="flex items-center space-x-2">
          <RadioGroupItem value={layout.value} id={layout.value} />
          <Label
            htmlFor={layout.value}
            className="text-sm font-medium cursor-pointer"
          >
            {layout.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
