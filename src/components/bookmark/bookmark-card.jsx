import { downloadPNG, removeBookmark } from "@/store/slices/operationSlice";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

export const BookmarkCard = ({ bookmark }) => {
  const dispatch = useDispatch();

  return (
    <Card className="group relative overflow-hidden border">
      <CardContent className="p-4 flex flex-col items-center justify-center">
        <div
          id={`logo-${bookmark.id}`}
          dangerouslySetInnerHTML={{ __html: bookmark.svg }}
          className="w-48 h-48 mb-3 [&>svg]:w-full [&>svg]:h-full"
        />

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dispatch(downloadPNG(`logo-${bookmark.id}`))}
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dispatch(removeBookmark(bookmark.id))}
          >
            <Trash2 className="w-5 h-5 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
