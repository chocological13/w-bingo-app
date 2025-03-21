"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-16 items-center">
        <div className="flex">
          <Link href="/">
            {/*<span className="game-title mr-2">Bingo</span>*/}
            <span className="inline text-primary-400 text-lg alt-heading">
              Bingo
            </span>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" className="rounded-full">
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
