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
        'dark-4' : '#1E1E1E',
        'dark-5' : '#2B2B2B',
        //2F4550 161a1d 
        'sky-1' : '#70d6ff',
        'gray-1' : '#333533',
        'gray-2' : '#343a40',
        'gray-4' : '#6c757d',
        'light-3' : '#dee2e6',
        'orange-1' : '#fca311'
      },
      backgroundImage: {
        'gradient-1' : 'linear-gradient(145deg, rgb(30, 32, 36), rgb(35, 39, 43))',
        'gradient-2' : 'linear-gradient(145deg,rgb(30, 32, 36),#0d1013)',
        'gradient-3' : 'linear-gradient(145deg, #f02981 0%, #c81901 100%)',
        'gradient-4' : 'linear-gradient(145deg, #ff014f 0%, #f9004d 100%)'

      },
      background:{
        'gradient-3' : 'linear-gradient(145deg,#23272b,#1e2024)',
      },
      boxShadow:{
        'shadow-1' : 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
        'shadow-inset' : 'inset 8px 8px 16px rgb(0 0 0 / 46%), inset -8px -8px 16px rgb(56 62 69 / 46%)',
        'shadow-inset-2' : '1px 4px 2px -3px rgba(0, 0, 0, 0.7) inset, -1px -3px 3px -2px rgba(255, 255, 255, 0.2) inset',
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