/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      light: '#e3e3e3',
      'light-gray': '#919191',
      dark: '#121212',
      muted: '#888',
      gray: '#2d2d2d',
      primary: '#232323',
      secondary: '#1e1e1e',
      pink: '#e31d65',
      orange: '#ff7c35',
      yellow: '#ffcb36',
      green: '#25a954',
      red: '#bb0000',
      blue: '#007d97',
      purple: '#553ab8',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },

    extend: {},
  },
  plugins: [],
};
