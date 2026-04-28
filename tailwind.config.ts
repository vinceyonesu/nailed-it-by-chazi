import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#FFF1F3",
          100: "#FFE0E6",
          200: "#FFC5D0",
          300: "#FF9CB0",
          400: "#FF6989",
          500: "#FF3868",
          600: "#E91E4D",
          700: "#C41040",
          800: "#A01039",
          900: "#881235",
        },
        blush: {
          50: "#FDF6F8",
          100: "#FBEEF2",
          200: "#F7DCE5",
          300: "#F0C0D0",
          400: "#E699B3",
          500: "#D97295",
          600: "#C9507A",
          700: "#A83A62",
          800: "#8A3050",
          900: "#732B45",
        },
        nude: {
          50: "#FDF9F7",
          100: "#FAF3EE",
          200: "#F4E5D8",
          300: "#EBD0BC",
          400: "#DEB498",
          500: "#CE9572",
          600: "#B87550",
          700: "#985E3E",
          800: "#7D4E34",
          900: "#68422D",
        },
        rosegold: {
          DEFAULT: "#C9956C",
          light: "#E5C4A8",
          dark: "#A07050",
        },
        cream: "#FDF8F5",
        petal: "#FDE8EE",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin 3s linear infinite",
        bounce: "bounce 1s infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
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
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "rose-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(201,149,108,0.15), 0 4px 6px -2px rgba(201,149,108,0.08)",
        glow: "0 0 20px rgba(201,149,108,0.3)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
