/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        green: {
          main: '#003228',
          main2: '#6EC850',
          alt: '#C8F0B4',
          alt2: '#315142',
        },
        blue: {
          DEFAULT: '#BEDCF0',
          alt: '#507896',
        },
        error: {
          DEFAULT: '#F01E32',
        },
        purple: {
          DEFAULT: '#640046',
        },
        yellow: {
          DEFAULT: '#F0DC8C',
        },
      },
    },
  },
  plugins: [],
};
