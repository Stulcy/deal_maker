/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainLight: "#c8c8c8",
        mainBlue: "#009CE0",
      },
    },
    fontFamily: {
      sans: ["Onest", "sans-serif"],
    },
  },
  plugins: [],
};
