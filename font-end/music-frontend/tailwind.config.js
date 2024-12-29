const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
