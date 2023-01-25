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
      muted: '#999',
      gray: '#2d2d2d',
      primary: '#23272a',
      secondary: '#1e1e1e',
      pink: '#e31d65',
      orange: '#ff7c35',
      yellow: '#F0DB4F',
      green: '#25a954',
      red: '#bb0000',
      blue: '#007d97',
      'light-purple': '#6e7fe7',
      purple: '#5D3FD3',
      'dark-purple': '#441aa4',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      gold: '#f9d71c',
      silver: '#ecebff',
      bronze: '#cd7f32',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },

    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },

    container: {
      center: true,
      maxWidth: '100%',
    },

    extend: {
      colors: {},
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/line-clamp')],
};
