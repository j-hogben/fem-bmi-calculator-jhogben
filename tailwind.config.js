/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*{html,js}"],
  theme: {
    extend: {
      colors: {
        blue: "#345FF6",
      },
      fontFamily: {
        body: "Inter",
      },
      fontSize: {
        headingXl: "4rem",
        headingL: "3rem",
        headingM: "1.5rem",
        headingS: "1.25rem",
        bodyM: "1rem",
        bodyS: "0.875rem",
      },
      lineHeight: {
        110: "110%",
        150: "150%",
      },
    },
  },
  plugins: [],
};
