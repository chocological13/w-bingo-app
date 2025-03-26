import type { Metadata } from "next";
import { headingFont, bodyFont, gameFont, altHeadingFont } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "W-Bingo App",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Toaster richColors position="top-right" />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
