# Personal Website - vuongho.me

A minimalist, mobile-first digital business card built with Next.js, TailwindCSS, and Framer Motion.

## Features

- 🎨 Dark mode aesthetic with subtle animations
- 📱 Mobile-first, responsive design
- 💳 Interactive card flip animation
- 🔄 Easy to customize through a single JSON file
- ⚡ Built with modern technologies

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vuongho.me.git
cd vuongho.me
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

All personal information is stored in `src/config/personal-info.json`. Edit this file to customize:

- Your name and title
- Profile image
- Experience history
- Social links
- Theme colors

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Card Flip](https://www.npmjs.com/package/react-card-flip) - Card flip animation
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Project Structure

```
src/
  ├── app/                 # Next.js app directory
  ├── components/         
  │   └── BusinessCard/   # Main business card component
  ├── config/             
  │   └── personal-info.json  # Personal information
  └── types/              # TypeScript type definitions
```

## License

MIT
