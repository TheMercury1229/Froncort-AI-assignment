import React from "react";
import { Loader2, Sparkles } from "lucide-react";

export const LoadingSpinner = ({ size = "default", text, className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

export const LogoGenerationLoader = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <Sparkles className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">Generating your logo...</p>
        <p className="text-sm text-muted-foreground">
          Our AI is crafting something amazing for you
        </p>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export const FullScreenLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-4">
        <LogoGenerationLoader />
        <p className="text-center text-muted-foreground mt-4">{message}</p>
      </div>
    </div>
  );
};
