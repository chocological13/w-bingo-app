import type { Metadata } from "next";
import { headingFont, bodyFont, gameFont, altHeadingFont } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Layout } from "lucide-react";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "W Bingo App",
  description: `{Putting the "Go" in Bingo}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          bodyFont.variable,
          headingFont.variable,
          altHeadingFont.variable,
          gameFont.variable,
          bodyFont.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
