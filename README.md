# Rooted

[![Deploy to GitHub Pages](https://github.com/robert-laws/rooted/actions/workflows/pages.yml/badge.svg)](https://github.com/robert-laws/rooted/actions/workflows/pages.yml)

Rooted is a one-page editorial website about the relationship between land, food, and community:

> For generations, communities have shaped the land and the land has shaped them. Tending the terraces, sharing the harvest - this is what it means to belong.

Live site: [https://robert-laws.github.io/rooted/](https://robert-laws.github.io/rooted/)

## Overview

The site is built as a lightweight Vite project with a custom image-processing pipeline. It uses optimized responsive image formats, a generated image manifest, and a restrained visual system based on deep greens, warm rice tones, misty blue-gray, and earthy accents.

Current structure:

- Hero section with Rooted identity and immersive terrace imagery
- Land section focused on terraces and place
- Harvest section with rice, seed, and green onion photography
- Belonging section with human-scale landscape imagery
- Closing editorial section

## Tech Stack

- Vite
- Vanilla JavaScript
- CSS
- Sharp for local image processing
- GitHub Actions and GitHub Pages for deployment

## Local Development

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

Build the production site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Image Pipeline

Source stock images are preserved separately from generated web assets. The processing script creates optimized derivatives and updates the image manifest used by the site.

Run the image pipeline:

```sh
npm run process:images
```

Run the full fresh build:

```sh
npm run build:fresh
```

Generated public assets live under `public/images`, while the site code reads image metadata from `src/imageManifest.js`.

## Deployment

The site is configured for GitHub Pages with Vite `base: "/rooted/"`.

Deployment runs through GitHub Actions on pushes to `main` using `.github/workflows/pages.yml`.
