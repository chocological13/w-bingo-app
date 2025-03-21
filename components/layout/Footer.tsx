import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "";

  return (
    <footer className="border-t bg-muted py-4">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Made with{" "}
          <Heart className="inline-block h-4 w-4 animate-bounce-slight fill-primary-500 text-primary-500" />{" "}
          by{" "}
          <span className="font-bold hover:underline cursor-pointer">
            <Link href={githubUrl}>{githubUsername}</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
