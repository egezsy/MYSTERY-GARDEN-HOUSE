import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3D2817",
          light: "#5C3D2A",
          dark: "#2A1B0F",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#7B6B8D",
          light: "#9B8FAA",
          dark: "#5E4F6E",
          foreground: "#FFFFFF",
        },
        gold: "#C9A96E",
        cream: "#F8F6F1",
        stone: "#E8E4DE",
        charcoal: "#2C2C2C",
        border: "#E8E4DE",
        input: "#E8E4DE",
        ring: "#7B6B8D",
        background: "#F8F6F1",
        foreground: "#2C2C2C",
        muted: {
          DEFAULT: "#E8E4DE",
          foreground: "#6B6B6B",
        },
        destructive: {
          DEFAULT: "#B3261E",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out forwards",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
