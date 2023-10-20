import { palette } from './palette';
// import { typography } from './typography';

// https://tailwindcss.com/docs/presets
module.exports = {
  theme: {
    colors: {
      ...palette,
    },
    extend: {
      fontFamily: {
        primary: ['Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
};
