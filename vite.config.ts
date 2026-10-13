import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    // The whole stylesheet gets inlined into index.html by scripts/prerender.js.
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
  },
});
