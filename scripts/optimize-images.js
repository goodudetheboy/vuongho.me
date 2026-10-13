// Generates the small, modern-format images served by the site from the
// originals in images-src/. Run with `npm run images` after changing a source.
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'images-src';
const OUT = 'public/images';

await mkdir(path.join(OUT, 'institutions'), { recursive: true });

// Avatar: rendered at most ~340px wide, so 400/800 covers 1x-2x DPR.
for (const width of [400, 800]) {
  const img = sharp(path.join(SRC, 'avatar.jpg')).resize({ width });
  await img.clone().avif({ quality: 55 }).toFile(path.join(OUT, `avatar-${width}.avif`));
  await img.clone().webp({ quality: 75 }).toFile(path.join(OUT, `avatar-${width}.webp`));
  await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `avatar-${width}.jpg`));
}

// Institution logos: rendered at 32px, so 64px covers 2x DPR.
for (const file of await readdir(path.join(SRC, 'institutions'))) {
  const name = path.parse(file).name;
  await sharp(path.join(SRC, 'institutions', file))
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(OUT, 'institutions', `${name}.webp`));
}
