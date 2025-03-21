import animate from "tailwindcss-animate";

/*
Note : With the new TailwindCSS V4, this doesn't really do anything.
This is here because, without it, the auto-complete feature on IDE doesn't recognize Tailwind.
But if you want to make any changes, do it in the `globals.css` file inside @theme.
And add it here just so it recognizes the new name.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
    "./src/**/*.{ts,tsx}",
    "./app/globals.css",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        "alt-heading": ["var(--font-alt-heading)"],
        body: ["var(--font-body)"],
        game: ["var(--font-game)"],
      },
      colors: {
        // Pink and beige theme
        primary: {
          50: "#fff1f5",
          100: "#ffe4eb",
          200: "#ffcad8",
          300: "#ffa1bb",
          400: "#ff6b97",
          500: "#ff3d78",
          600: "#ff1161",
          700: "#e60050",
          800: "#bd0042",
          900: "#9c0039",
          950: "#570020",
        },
        secondary: {
          50: "#faf6f0",
          100: "#f3ece0",
          200: "#e6dac1",
          300: "#d9c8a2",
          400: "#cbb17e",
          500: "#c1a065",
          600: "#ac8952",
          700: "#8e6f44",
          800: "#745b3a",
          900: "#604c32",
          950: "#332819",
        },
        accent: {
          DEFAULT: "#ffc2d4",
          foreground: "#570020",
        },
        background: {
          DEFAULT: "#fffbf5",
          dark: "#2D243B",
        },
        foreground: {
          DEFAULT: "#332819",
          dark: "#f3ece0",
        },
        card: {
          DEFAULT: "#fff8f8",
          dark: "#372e4a",
        },
        border: {
          DEFAULT: "#ffd1dc",
          dark: "#493a60",
        },
        ring: {
          DEFAULT: "#ffcad8",
          dark: "#63517e",
        },
        muted: {
          DEFAULT: "#f3ece0",
          foreground: "#745b3a",
          dark: "#3d3250",
          "dark-foreground": "#d9c8a2",
        },
        destructive: {
          DEFAULT: "#ff5757",
          foreground: "#fff1f5",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "bounce-slight": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-slight": "bounce-slight 1s infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
