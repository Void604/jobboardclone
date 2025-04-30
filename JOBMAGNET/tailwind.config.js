/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fc',
          100: '#cce3f9',
          200: '#99c7f3',
          300: '#66abee',
          400: '#338fe8',
          500: '#0A66C2', // primary blue
          600: '#0852a1',
          700: '#063e79',
          800: '#042a50',
          900: '#021528',
        },
        secondary: {
          50: '#e6f8fc',
          100: '#ccf1f9',
          200: '#99e3f3',
          300: '#66d5ee',
          400: '#33c7e8',
          500: '#00A0DC', // secondary teal
          600: '#0080b0',
          700: '#006084',
          800: '#004058',
          900: '#00202c',
        },
        accent: {
          50: '#fff0ee',
          100: '#ffe1dd',
          200: '#ffc3bb',
          300: '#ffa599',
          400: '#ff8777',
          500: '#FF6347', // accent orange/coral
          600: '#cc5039',
          700: '#993c2b',
          800: '#66281c',
          900: '#33140e',
        },
        success: {
          500: '#34D399', // success green
        },
        warning: {
          500: '#FBBF24', // warning yellow
        },
        error: {
          500: '#EF4444', // error red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};