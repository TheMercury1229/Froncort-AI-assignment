import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitialise } from "@/lib/utils";

export const DesignConfigCard = ({ logoConfig, IconComponent }) => {
  const { primaryColor, fontStyle, selectedIcon, logoShape, layoutType } =
    logoConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Design Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-md font-medium">Primary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: primaryColor }}
            />
            <Badge variant="secondary">{capitialise(primaryColor)}</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-md font-medium">Font Style:</span>
          <Badge variant="outline" style={{ fontFamily: fontStyle }}>
            {capitialise(fontStyle)}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-md font-medium">Icon:</span>
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4" />
            <Badge variant="outline">{capitialise(selectedIcon)}</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-md font-medium">Shape:</span>
          <Badge variant="outline">{capitialise(logoShape)}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-md font-medium">Layout:</span>
          <Badge variant="outline">
            {capitialise(layoutType.replace("-", " "))}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
