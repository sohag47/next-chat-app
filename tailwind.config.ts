import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#008BAC",
        secondary: "#2C4563",
        foreground: "#3BB0C2",
        info: "#0071C1",
        dark: "#161616",
        light: "#F0F0F0",
        warning: "#F5A524",
        success: "#18C964",
        danger: "#F31260",
      },
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borders: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      backgroundImage: {
        "base-gradient": "linear-gradient(180deg, #008BAC 0%, #2C4563 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
