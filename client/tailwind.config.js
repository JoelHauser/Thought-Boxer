/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend:{
      colors: {
        "fleshypink": "#FFDDD2"
      },
      
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
