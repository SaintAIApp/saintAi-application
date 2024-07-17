/** @type {import('tailwindcss').Config} */
import svgToDataUri from "mini-svg-data-uri";
 
import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#17B982",
        secondary:"",
        dark:"#1e1e1e",
        darkSecondary:"#1c1c1c",
        purple:"#513799",
        purple_dark:"#893bff",
        blue_darK:"#1a0166",
        blue:"#016FC8",
        grey:"#2C3140"
      },
      fontFamily:{
        body:["Inter"],
        heading:["RON"],
        roboto:["roboto"]
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        contentShow: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        custom1: '0px 10px 38px -10px rgba(29, 37, 49, 0.35)', // hsl(206, 22%, 7%, 35%)
        custom2: '0px 10px 20px -15px rgba(29, 37, 49, 0.20)', // hsl(206, 22%, 7%, 20%)
      },
    },
  },
  plugins: [import('@tailwindcss/line-clamp'),
  function ({ matchUtilities, theme }: any) {
    matchUtilities(
      {
        "bg-grid": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="#39276b"><path  d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-grid-small": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path  d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-dot": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="#39276b" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
          )}")`,
        }),
      },
      { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    );
  },
  ],
}