/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        bgDark: "var(--color-bg-dark)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        luxPrimary: "var(--lux-primary)",
        luxSecondary: "var(--lux-secondary)",
        luxAccent: "var(--lux-accent)",
      },
      boxShadow: {
        glowPrimary: "var(--shadow-glow-primary)",
        glowSecondary: "var(--shadow-glow-secondary)",
        glowAccent: "var(--shadow-glow-accent)",
      },

      /* === premium add: цвета/градиенты/анимации === */
      backgroundImage: {
        'hi-tech': 'linear-gradient(180deg, #0a0b10 0%, #10121a 100%)',
        'hi-radial':
          'radial-gradient(800px 500px at 15% 25%, rgba(78,70,229,.14), transparent 60%), radial-gradient(600px 350px at 85% 70%, rgba(6,182,212,.12), transparent 60%)',
      },
      boxShadow: {
        'neon-primary': '0 0 14px rgba(0,224,255,.45)',
        'neon-secondary': '0 0 14px rgba(123,92,255,.45)',
      },
      dropShadow: {
        'text-neon': ['0 0 10px rgba(0,224,255,.55)'],
      },
      animation: {
        'fade-in': 'fade-in .6s ease-out both',
        'float-y': 'float-y 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
