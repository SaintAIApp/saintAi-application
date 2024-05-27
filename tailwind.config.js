/** @type {import('tailwindcss').Config} */
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
        purple:"#513799",
        purple_dark:"#893bff",
        blue_darK:"#1a0166"
      },
      fontFamily:{
        body:["Inter"],
        heading:["RON"]
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
  plugins: [require('@tailwindcss/line-clamp')],
}