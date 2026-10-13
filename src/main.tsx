import { hydrate, render } from 'preact';
import App from './App';
import './globals.css';

const root = document.getElementById('app')!;
// Production HTML is prerendered (scripts/prerender.js); dev serves an empty shell.
if (root.firstElementChild) {
  hydrate(<App />, root);
} else {
  render(<App />, root);
}
