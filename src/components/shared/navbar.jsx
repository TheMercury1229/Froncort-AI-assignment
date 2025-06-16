import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="flex items-center w-full justify-between py-2 px-5 max-w-7xl mx-auto border-b border-muted">
      <div className="text-2xl font-semibold">
        <Link href={"/"}>Logo.AI</Link>
      </div>
      <div>
        <Button size="lg" variant="outline" asChild>
          <Link href={"/bookmark"}>Bookmarks</Link>
        </Button>
      </div>
    </header>
  );
};
