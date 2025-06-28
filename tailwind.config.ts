import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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

export default config; 