import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f4f1eb",
        porcelain: "#fbfaf7",
        ink: "#17181d",
        muted: "#666d78",
        blue: {
          electric: "#2563eb",
          glow: "#5aa7ff",
        },
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        tactile:
          "18px 18px 42px rgba(49, 54, 63, 0.13), -14px -14px 30px rgba(255, 255, 255, 0.92), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        inset:
          "inset 8px 8px 18px rgba(66, 71, 80, 0.11), inset -8px -8px 18px rgba(255, 255, 255, 0.95)",
        blue: "0 18px 44px rgba(37, 99, 235, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
