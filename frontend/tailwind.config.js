/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'primary-light': '#B98252',
      'primary': '#97683F',
      'primary-dark': '#845A36',
      'sec-light': '#A6A7AA',
      'secondary': '#5E5E67',
      'sec-dark': '#414144',
      'black': '#1A181F',

    },
   
    fontFamily: {
      playfair: 'Playfair Display Black',
      mon: 'Montserrat'
    },

  },
},
  plugins: [],
}