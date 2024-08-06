/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*{html,js}"],
  theme: {
    extend: {
      colors: {
        gunmetal: "#253347",
        darkElectricBlue: "#5E6E85",
        blue: "#345FF6",
        gradBottomRight: "rgba(214, 230, 254, 100%)",
        gradTopLeft: "rgba(214, 252, 254, 0%)",
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
      letterSpacing: {
        heading: "-0.05em",
      },
      lineHeight: {
        110: "110%",
        150: "150%",
        120: "120.83%",
      },
      height: {
        bgPatternMob: "40rem",
        bgPatternDesk: "46.0625rem",
      },
      margin: {
        4.5: "1.125rem",
      },
      gap: {
        4.5: "1.125rem",
      },
      borderRadius: {
        bgPattern: "35px",
      },
      boxShadow: {
        card: "1rem 2rem 3.5rem 0 rgba(143, 174, 207, 25%)",
      },
    },
  },
  plugins: [],
};
