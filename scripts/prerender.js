// Renders the app to static HTML and inlines the stylesheet, so the first
// response paints the full card without waiting on JS or a CSS round-trip.
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

let html = await readFile(path.join(DIST, 'index.html'), 'utf8');
const assets = await readdir(path.join(DIST, 'assets'));

// Inline the CSS and drop the external stylesheet link.
const cssFile = assets.find((f) => f.endsWith('.css'));
const css = await readFile(path.join(DIST, 'assets', cssFile), 'utf8');
html = html.replace(/<link rel="stylesheet"[^>]*>/, '');
html = html.replace('</head>', `<style>${css}</style></head>`);
await rm(path.join(DIST, 'assets', cssFile));

// Preload the font so text renders in Space Grotesk on first paint.
const font = assets.find((f) => f.endsWith('.woff2'));
html = html.replace(
  '<!--preload-->',
  `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>`,
);

html = html.replace('<!--app-->', render());
await writeFile(path.join(DIST, 'index.html'), html);
await rm('dist-ssr', { recursive: true, force: true });
console.log(`prerendered ${DIST}/index.html (${(html.length / 1024).toFixed(1)} KiB)`);
