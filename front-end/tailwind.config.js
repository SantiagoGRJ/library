/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        
      },
    },
    extend: {
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
