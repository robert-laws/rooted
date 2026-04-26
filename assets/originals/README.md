# Rooted Original Images

The PNG files in `stock-images/` are the untouched local source images for Rooted.

They are intentionally ignored by git so the public GitHub Pages repository only ships optimized web assets.

Run `npm run process:images` to create optimized AVIF, WebP, and JPG variants in `public/images/` and regenerate `src/imageManifest.js`.
