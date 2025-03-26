"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import LogOutButton from "@/components/auth/LogOutButton";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-16 items-center">
        <div className="flex dark:drop-shadow-[0px_0px_10px_#eeb2bb] drop-shadow-[0px_5px_10px_#cbb17e]">
          <Link href="/" className="flex flex-row gap-1">
            <Image src="/lottery.svg" alt="bingo logo" width={27} height={15} />
            <span className="inline text-primary-400 text-lg alt-heading">
              W-Bingo
            </span>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          <LogOutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
