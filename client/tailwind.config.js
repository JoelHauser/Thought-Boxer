/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend:{
      colors: {
        "fleshypink": "#FFDDD2",
        "blue": "#0000FF",
        "red": "#ea6178"
      },
      
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
