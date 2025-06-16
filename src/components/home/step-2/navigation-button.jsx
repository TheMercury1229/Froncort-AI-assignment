import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

export const NavigationButtons = ({ onPrevious, onGenerate, loading }) => {
  return (
    <div className="flex justify-between pt-6 flex-col md:flex-row gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Button>

      <Button
        onClick={onGenerate}
        size="lg"
        disabled={loading}
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
  );
};
