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
      'light-purple': '#CBC3E3',
      purple: '#553ab8',
      'dark-purple': '#441aa4',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },

    dropShadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
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
