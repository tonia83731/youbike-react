/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        light: "#FFFFFF",
        light_green: "#B5CC22",
        olive: "#677510",
        gray: "#F6F6F6",
        gray_border: "#EBEBEB",
        gray_table_border: "#AEAEAE",
        gray_input: '#F3F3F3',
        dark: "#323232",
      }
    },
  },
  plugins: [],
}

