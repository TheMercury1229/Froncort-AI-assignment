"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Bookmark, RefreshCw } from "lucide-react";
import { downloadPNG, bookmarkLogo } from "@/store/slices/operationSlice";

export const LogoActions = ({ onRegenerate, loading }) => {
  const dispatch = useDispatch();
  const { generatedSVG, bookmarks } = useSelector((state) => state.logoOps);
  const handleDownload = () => {
    dispatch(downloadPNG("generated-logo"));
    toast.success("Logo downloaded successfully!", {
      description: "Your logo has been saved as a PNG file.",
    });
  };

  const handleBookmark = () => {
    dispatch(bookmarkLogo());
    toast.success("Logo bookmarked!", {
      description: "You can find this logo in your bookmarks.",
    });
  };

  const handleRegenerateWithToast = () => {
    onRegenerate();
    toast.info("Regenerating logo...", {
      description: "Creating a new version of your logo.",
    });
  };

  const isBookmarked = bookmarks.some((bookmark) => bookmark === generatedSVG);

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2 flex-1 py-2"
        size="sm"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </Button>

      <Button
        onClick={handleBookmark}
        variant="outline"
        className="flex items-center gap-2 flex-1 py-2"
        disabled={isBookmarked}
        size="sm"
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>

      <Button
        onClick={handleRegenerateWithToast}
        variant="outline"
        className="flex items-center gap-2 flex-1 py-2"
        disabled={loading}
        size="sm"
      >
        <RefreshCw className="w-4 h-4" />
        Regenerate
      </Button>
    </div>
  );
};
