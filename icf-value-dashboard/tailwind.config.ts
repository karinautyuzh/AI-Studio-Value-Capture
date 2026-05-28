import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BE0000',
          dark: '#8B0000',
        },
        tfs: {
          charcoal: '#2C2C2C',
          teal: '#00857C',
          blue: '#1A6EA8',
          offwhite: '#F8F8F6',
          gray: '#E8E8E4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
