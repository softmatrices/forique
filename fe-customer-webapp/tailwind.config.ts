import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amethyst Elegance Palette
        primary: {
          DEFAULT: "#4a1d6e",
          light: "#6b3fa0",
          dark: "#2d1245",
        },
        accent: {
          DEFAULT: "#d4a5a5",
          warm: "#c9a0dc",
          rose: "#e8c4c4",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f3f7",
        },
        background: "#faf8fc",
        foreground: "#1a1625",
        muted: {
          DEFAULT: "#6b6580",
          foreground: "#8a849a",
        },
        border: "#e8e4ef",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        oliver: ["var(--font-oliver)", "serif"],
      },
      fontSize: {
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(74, 29, 110, 0.08), 0 4px 6px -4px rgba(74, 29, 110, 0.04)",
        "elegant": "0 10px 40px -10px rgba(74, 29, 110, 0.15)",
        "glow": "0 0 30px rgba(74, 29, 110, 0.2)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
