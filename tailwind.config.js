/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        olive: 'var(--olive)',
        lime: {
          DEFAULT: 'var(--lime)',
          light: 'var(--lime-light)',
          bright: 'var(--lime-bright)',
        },
        cream: {
          DEFAULT: 'var(--cream)',
          dark: 'var(--cream-dark)',
        },
        sand: 'var(--sand)',
        bark: 'var(--bark)',
        text: {
          dark: 'var(--text-dark)',
          mid: 'var(--text-mid)',
          muted: 'var(--text-muted)',
        }
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      boxShadow: {
        'sm-custom': '0 2px 8px rgba(0, 52, 98, 0.1)',
        'md-custom': '0 8px 24px rgba(0, 52, 98, 0.12)',
        'lg-custom': '0 16px 48px rgba(0, 52, 98, 0.18)',
        'lime': '0 4px 20px rgba(0, 70, 169, 0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease both',
        'fade-in': 'fadeIn 0.5s ease both',
        'float': 'float 3s ease-in-out infinite',
        'why-scroll': 'whyScroll 18s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        whyScroll: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
