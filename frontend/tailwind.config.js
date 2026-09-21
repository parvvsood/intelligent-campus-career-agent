/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#7c98fb',
          500: '#536df8',
          600: '#3b4bf2',
          700: '#2d37de',
          800: '#272eb4',
          900: '#252c8f',
          950: '#171a58',
        },
        dark: {
          bg: '#0B0F17',
          surface: '#121824',
          card: '#182030',
          border: '#243046',
          muted: '#3A4B68',
        },
        porcelain: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#F1F5F9',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(83, 109, 248, 0.25)',
        'glow-md': '0 0 25px -5px rgba(83, 109, 248, 0.35)',
        'glow-lg': '0 0 40px -10px rgba(83, 109, 248, 0.45)',
        'claude': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
