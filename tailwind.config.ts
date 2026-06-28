import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#060b13",
        graphite: "#0d1521",
        mist: "#d7e1ee",
        azure: "#6dd3ff",
        aurora: "#9ff5d2",
        ember: "#f4b66f",
      },
      boxShadow: {
        surface: "0 24px 80px rgba(2, 6, 15, 0.28)",
      },
      backgroundImage: {
        "surface-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        body: ["var(--font-manrope)"],
      },
    },
  },
  plugins: [],
};

export default config;
