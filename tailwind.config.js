/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
          950: 'rgb(23 37 84)',
        },
        secondary: {
          50: 'rgb(236 254 255)',
          100: 'rgb(207 250 254)',
          200: 'rgb(165 243 252)',
          300: 'rgb(103 232 249)',
          400: 'rgb(34 211 238)',
          500: 'rgb(6 182 212)',
          600: 'rgb(8 145 178)',
          700: 'rgb(14 116 144)',
          800: 'rgb(21 94 117)',
          900: 'rgb(22 78 99)',
          950: 'rgb(8 51 68)',
        },
        accent: {
          50: 'rgb(255 247 237)',
          100: 'rgb(255 237 213)',
          200: 'rgb(254 215 170)',
          300: 'rgb(253 186 116)',
          400: 'rgb(251 146 60)',
          500: 'rgb(249 115 22)',
          600: 'rgb(234 88 12)',
          700: 'rgb(194 65 12)',
          800: 'rgb(154 52 18)',
          900: 'rgb(124 45 18)',
          950: 'rgb(67 20 7)',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [],
};