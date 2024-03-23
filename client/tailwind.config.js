/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rem: ["rem", "sans-serif"],
        remBold: ["remBold", "sans-serif"],
        poppins: ["Poppins", "sanss-serif"],
        graphieBold: ["graphieBold", "sans-serif"],
      },
      colors: {
        background: "#FAFBFC",
        background2: "#F7F8FC",
        orange: "#F3983A",
        grey: "#E9EBF0",
        foreground: "#ECEDEE",
        foreground2: "#6B7280",
        content: "#232323",
        lime: "#0AFF9D",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [nextui()],
};
