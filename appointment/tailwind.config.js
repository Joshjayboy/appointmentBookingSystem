/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "2.6rem",
      },
      screens: {
        xs: "475px",
      },
      height: {
        header: "560px",
        rate: "400px",
      },
      colors: {
        main: "#FFFFFF",
        deep: "#000000",
        subMain: "#0000FF",
        delete: "#F20000",
        dry: "#0B0F29",
        star: "#FFB000",
        text: "#C0C0C0",
        border: "#4b5563",
        dryGray: "#E0D5D5",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
