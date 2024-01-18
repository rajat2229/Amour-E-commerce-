/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#724B50",
        primary_hover: "#724B50e9",
        background_primary: "#ECCECE",
        background_secondary: "#724B50",
        background_tertiary: "#FEAFAF",
        background_linear:"linear-gradient(180deg, #FFFFFF 0%, #ECCECE 100%)",
        box_shadow: "rgba(0,0,0,0.2)",
        border_primary:"#ECCECE",
        border_secondary: "#724B50",
      },
      fontFamily: {
        primary_font: ["Abhaya Libre", "serif"],
        secondary_font: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        westText: '8rem',
      },
      screens:{
        'xxs':'320px',
        'xs':'380px',
        'sm':'640px',
        'md':'768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [],
};
