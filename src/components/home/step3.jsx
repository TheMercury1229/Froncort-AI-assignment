import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWizard } from "react-use-wizard";
import { StepLayout } from "@/components/layouts/step-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Bookmark,
  RefreshCw,
  Loader2,
  CheckCircle,
  Share2,
} from "lucide-react";
import {
  downloadPNG,
  bookmarkLogo,
  generateSVG,
  resetLogo,
} from "@/store/slices/operationSlice";
import { LoadingSpinner } from "../shared/loading";

export const Step3 = () => {
  const { previousStep } = useWizard();
  const dispatch = useDispatch();

  const logoConfig = useSelector((state) => state.logo);
  const { generatedSVG, loading, error, bookmarks } = useSelector(
    (state) => state.logoOps
  );

  const { companyName } = logoConfig;

  // Handle regenerate logo
  const handleRegenerateLogo = async () => {
    try {
      await dispatch(generateSVG(logoConfig));
    } catch (err) {
      console.error("Logo regeneration failed:", err);
    }
  };

  // Handle download
  const handleDownload = () => {
    dispatch(downloadPNG("generated-logo"));
  };

  // Handle bookmark
  const handleBookmark = () => {
    dispatch(bookmarkLogo());
  };

  // Check if logo is already bookmarked
  const isBookmarked = bookmarks.some((bookmark) => bookmark === generatedSVG);

  return (
    <StepLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Your Generated Logo</h2>
          <p className="text-muted-foreground text-sm">
            Here's your AI-generated logo. You can download, bookmark, or
            regenerate it.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="text-red-600 text-sm">{error}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateLogo}
                  disabled={loading}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Logo Display */}
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {companyName ? `${companyName} Logo` : "Generated Logo"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center min-h-[400px] rounded-lg relative">
                {loading ? (
                  <LoadingSpinner text="Wait while our AI is generating the logo...." />
                ) : generatedSVG ? (
                  <div
                    id="generated-logo"
                    className="flex justify-center items-center p-8 bg-white rounded-lg shadow-lg overflow-hidden w-full h-full"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: generatedSVG }}
                      className="max-w-full max-h-full"
                    />
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>No logo generated yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {generatedSVG && !loading && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Logo generated successfully!
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {generatedSVG && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
              variant="default"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </Button>

            <Button
              onClick={handleBookmark}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isBookmarked}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>

            <Button
              onClick={handleRegenerateLogo}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>
        )}

        {/* Additional Options */}
        {generatedSVG && !loading && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Download & Use</h4>
                    <p className="text-sm text-muted-foreground">
                      Download your logo in PNG format for immediate use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Share2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Share & Get Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your logo with team members for feedback.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Preview
          </Button>

          <Button
            onClick={() => dispatch(resetLogo())}
            variant="outline"
            className="flex items-center gap-2"
            disabled={loading}
          >
            Create New Logo
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};
