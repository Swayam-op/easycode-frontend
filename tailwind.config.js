/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'light-1': '#F4F4F9',
        'light-2': '#B8DBD9',
        'dark-1': '#586F7C',
        'dark-2': '#353535 ',
        'black': '#252422',
        //2F4550 161a1d 
        'gray-1' : '#333533',
        'gray-2' : '#343a40',
        'gray-4' : '#6c757d',
      },
      boxShadow:{
        'shadow-1' : 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
      },
      width: {
        '98': '25rem',
        '100': '26rem',
      },
      height: {
        '90/100': '90%',
      },
      animation: {
        'forward-slow': 'forward 3s linear infinite',
      },
      keyframes: {
        forward: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(100px)' },
        }
    },
  },
  plugins: [
    require('flowbite/plugin'),
],
}
}