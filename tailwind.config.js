/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-general-sans)'],
        general: ['var(--font-general-sans)'],
        anokha: ['var(--font-anokha)'],
      },
      colors: {
        background: '#171717',
        foreground: '#FBFBFB',
      },
      keyframes: {
        shadowColor: {
          '0%, 100%': { 'box-shadow': `4px 4px 0px 0px ${colors.green[500]}`},
          '33%': { 'box-shadow': `4px 4px 0px 0px ${colors.red[500]}` },
          '66%': { 'box-shadow': `4px 4px 0px 0px ${colors.blue[500]}` },
        },
        diagonal: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(4px, 4px)' },
        },
      },
      animation: {
        shadowColor: 'shadowColor 3s linear infinite',
        diagonal: 'diagonal 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
