/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        card: '#111111',
        'text-primary': '#ffffff',
        'text-secondary': '#aaaaaa',
        accent: '#00ffc8',
      },
    },
  },
  plugins: [],
};

