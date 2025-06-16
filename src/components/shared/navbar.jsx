import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="flex items-center w-full justify-between py-2 px-5 max-w-7xl mx-auto border-b border-muted">
      <div>
        <Link href={"/"}>Logo.AI</Link>
      </div>
      <div>
        <Button size="lg" variant="outline">
          Bookmarked
        </Button>
      </div>
    </header>
  );
};
