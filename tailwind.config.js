const NativeWindPlugin = require("nativewind/tailwind/css");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        divider: "#D1D5DB",
      },
    },
  },
  plugins: [NativeWindPlugin],
};
