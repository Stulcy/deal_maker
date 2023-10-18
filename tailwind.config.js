/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainGray: "#515151",
      },
    },
    fontFamily: {
      sans: ["Onest", "sans-serif"],
    },
  },
  plugins: [],
};
