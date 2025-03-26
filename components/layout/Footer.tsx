import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = ({ className }: { className?: string }) => {
  const githubUsername =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "chocological13";
  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/chocological13";

  return (
    <footer className={className}>
      <div className="container flex flex-col items-center justify-center">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Made with{" "}
          <Heart className="inline-block h-4 w-4 animate-bounce-slight fill-primary-500 text-primary-500" />{" "}
          by{" "}
          <span className="font-bold hover:underline cursor-pointer">
            <Link href={githubUrl} passHref target="_blank">
              {githubUsername}
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
