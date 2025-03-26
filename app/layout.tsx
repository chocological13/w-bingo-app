import type { Metadata } from "next";
import { headingFont, bodyFont, gameFont, altHeadingFont } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "W-Bingo",
  description:
    "🔥 Get those Ws with W-Bingo! Create, customize, and play bingo like a champ. 🎉🏆",
  openGraph: {
    title: "W-Bingo",
    description:
      "🔥 Get those Ws with W-Bingo! Create, customize, and play bingo like a champ. 🎉🏆",
    images: [
      {
        url: `${siteUrl}/lottery.png`,
        width: 1200,
        height: 630,
        alt: "W-Bingo App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "W-Bingo",
    description:
      "🔥 Get those Ws with W-Bingo! Create, customize, and play bingo like a champ. 🎉🏆",
    images: `${siteUrl}/lottery.png`,
  },
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
