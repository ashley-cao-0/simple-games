/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        shrink: {
          '0%': {width:'100%'},
          '100%':{width:'0%'}
        },
        wobble: {
          '0%':{transform: 'translateX(0)'},
          '25%':{transform: 'translateX(-4px)'},
          '50%':{transform: 'translateX(4px)'},
          '75%':{transform: 'translateX(-2px)'},
          '87.5%':{transform: 'translateX(2px)'},
          '100%':{transform: 'translateX(0)'},
        },
        flicker:{
          '0%, 35%': {opacity: '0%'},
          '36%,100%':{opacity:'100%'}
        },
        goleft:{
          '0%':{transform:'translate(0,0)'},
          '100%':{transform:'translate(300px,0)'}
        }
      },
    },
  },
  plugins: [],
}
