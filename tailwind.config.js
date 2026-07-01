/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black:   '#050607',
        surface: '#0a0c0f',
        cyan:    '#00d4ff',
        text:    '#d8dce4',
        muted:   '#68788a',
        dim:     '#35455a',
        'surface-2': '#111620',
        'cyan-dim': '#00d4ff22',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Teko', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-cyan': 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'cyan': '0 0 20px rgba(0,212,255,0.3)',
        'cyan-sm': '0 0 10px rgba(0,212,255,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      borderColor: {
        'cyan-dim': 'rgba(0,212,255,0.15)',
        'cyan-mid': 'rgba(0,212,255,0.3)',
      },
    },
  },
  plugins: [],
}
