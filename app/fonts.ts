import { Quicksand, Nunito, Pacifico, Comfortaa } from "next/font/google";

// Cute, rounded font for headings
export const headingFont = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

// Alternative heading font option (more readable but still cute)
export const altHeadingFont = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alt-heading",
  display: "swap",
});

// Primary font for body text
export const bodyFont = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

// Font for numbers on bingo cards
export const gameFont = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-game",
  display: "swap",
});
