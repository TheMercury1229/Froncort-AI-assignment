"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import { loadBookmarks } from "@/store/slices/operationSlice";
import { BookmarkCard } from "@/components/bookmark/bookmark-card";

export default function BookmarkPage() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.logoOps.bookmarks);

  useEffect(() => {
    dispatch(loadBookmarks());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Bookmarked Logos</h1>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            No bookmarks found. Generate and bookmark some logos first!
          </p>
          <Button
            size={"lg"}
            asChild
            className={
              "bg-gradient-to-r rounded-full from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }
          >
            <Link href="/">Generate Logo Now</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}
