// const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          main: "#55AD9B",
          light: "#95D2B3",
          dark: "#1B4242",
        },
        secondary: {
          main: "#D8EFD3",
          light: "#F1F8E8",
          dark: "#F1F8E8",
        },
        error: {
          main: "#FB5555",
          light: "#FACCCC",
          dark: "#FB5555",
        },
        warning: {
          main: "#ed6c02",
          light: "#ff9800",
          dark: "#e65100",
        },
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: "0.04",
          selected: "#D99BFF",
          selectedOpacity: "0.08",
          disabled: "#CBCDCF",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
          disabledOpacity: "0.38",
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: "0.12",
          activatedOpacity: "0.12",
          backdrop: "rgba(52, 64, 84, 0.6)",
          backdropFilter: "blur(16px)",
        },
      },
    },
  },
  plugins: [],
};
