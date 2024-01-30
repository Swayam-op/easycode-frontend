/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'light-1': '#F4F4F9',
        'light-2': '#ccc5b9',
        // 'light-3':'#eff1f6bf',
        'dark-1': '#3772ff',
        'dark-2': '#302c2c',
        'dark-3' : '#201c1c',
        'black': '#252422',
        //2F4550 161a1d 
        'sky-1' : '#70d6ff',
        'gray-1' : '#333533',
        'gray-2' : '#343a40',
        'gray-4' : '#6c757d',
        'light-3' : '#dee2e6',
        'orange-1' : '#fca311'
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
    backgroundImage: {
      // 'badge10': "url('/badge10.svg')",
    }
  },
  plugins: [
    require('flowbite/plugin'),
],
borderWidth: {
  DEFAULT: '0.5px',
  '0': '0',
  '2': '2px',
  '3': '3px',
  '4': '4px',
  '6': '6px',
  '8': '8px',
}
}
}