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
        dark: {
          bg: '#0a0a0f',
          surface: '#1a1a2e',
          card: '#16213e',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(to right, #a855f7, #ec4899)',
        'gradient-blue-purple': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        'gradient-cyan-blue': 'linear-gradient(to right, #06b6d4, #3b82f6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-lg': '0 0 30px rgba(168, 85, 247, 0.6)',
      },
    },
  },
  plugins: [],
}

