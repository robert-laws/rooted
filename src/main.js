import "./styles.css";
import { imageManifest } from "./imageManifest.js";

const base = import.meta.env.BASE_URL;

function findImage(group, id) {
  const image = imageManifest.groups[group].find((item) => item.id === id);
  if (!image) {
    throw new Error(`Missing image: ${group}/${id}`);
  }
  return image;
}

function srcSet(image, format) {
  return image.variants[format]
    .map((variant) => `${base}${variant.src} ${variant.width}w`)
    .join(", ");
}

function picture(group, id, className, sizes = "100vw", loading = "lazy") {
  const image = findImage(group, id);
  const fallback = image.variants.jpg[image.variants.jpg.length - 1];
  return `
    <picture class="${className}">
      <source type="image/avif" srcset="${srcSet(image, "avif")}" sizes="${sizes}">
      <source type="image/webp" srcset="${srcSet(image, "webp")}" sizes="${sizes}">
      <img
        src="${base}${fallback.src}"
        srcset="${srcSet(image, "jpg")}"
        sizes="${sizes}"
        alt="${image.alt}"
        loading="${loading}"
        decoding="async"
        style="object-position: ${image.focal};"
      >
    </picture>
  `;
}

document.querySelector("#app").innerHTML = `
  <header class="site-header" aria-label="Primary">
    <a class="brand-mark" href="#top" aria-label="Rooted home">Rooted</a>
    <nav class="site-nav" aria-label="Sections">
      <a href="#land">Land</a>
      <a href="#harvest">Harvest</a>
      <a href="#belonging">Belonging</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      ${picture("landscape", "terrace-workers-wide-01", "hero-media", "100vw", "eager")}
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="kicker">Land shaped by hands. Hands shaped by land.</p>
        <h1 id="hero-title">Rooted</h1>
        <p class="hero-copy">
          For generations, communities have shaped the land and the land has shaped them.
          Tending the terraces, sharing the harvest — this is what it means to belong.
        </p>
      </div>
    </section>

    <section class="intro-section" aria-label="Rooted introduction">
      <div class="intro-rule"></div>
      <p>
        Rooted follows the quiet intelligence of cultivated hillsides: water held in place,
        pathways learned by memory, and harvests made possible by people who return season
        after season.
      </p>
    </section>

    <section class="story-section land-section" id="land" aria-labelledby="land-title">
      <div class="section-copy">
        <p class="eyebrow">The Land</p>
        <h2 id="land-title">Terraces make time visible.</h2>
        <p>
          Each level is a small act of care. Soil is held. Water slows. A hillside becomes
          a living archive of weather, labor, inheritance, and renewal.
        </p>
      </div>
      <div class="land-composition">
        ${picture("landscape", "terrace-mist-01", "mist-image", "(min-width: 900px) 58vw, 100vw")}
        <p class="image-note">Morning mist settles into the terraces before the day’s work begins.</p>
      </div>
    </section>

    <section class="harvest-section" id="harvest" aria-labelledby="harvest-title">
      <div class="harvest-heading">
        <p class="eyebrow">The Harvest</p>
        <h2 id="harvest-title">What is gathered carries the place with it.</h2>
        <p>
          Rice, seeds, and herbs become more than ingredients. They become proof of shared
          attention, seasonal rhythm, and the patience of many hands.
        </p>
      </div>
      <div class="harvest-grid">
        <figure>
          ${picture("harvest", "rice-bowls-01", "harvest-image", "(min-width: 900px) 31vw, 92vw")}
          <figcaption>Rice varieties sorted by texture, color, and use.</figcaption>
        </figure>
        <figure>
          ${picture("detail", "seed-study-02", "harvest-image", "(min-width: 900px) 31vw, 92vw")}
          <figcaption>Seeds held back for what comes next.</figcaption>
        </figure>
        <figure>
          ${picture("harvest", "green-onions-01", "harvest-image", "(min-width: 900px) 31vw, 92vw")}
          <figcaption>Fresh greens as a bright, immediate harvest.</figcaption>
        </figure>
      </div>
    </section>

    <section class="story-section belonging-section" id="belonging" aria-labelledby="belonging-title">
      <div class="belonging-media">
        ${picture("landscape", "terrace-workers-mid-01", "workers-image", "(min-width: 900px) 48vw, 100vw")}
      </div>
      <div class="section-copy">
        <p class="eyebrow">Belonging</p>
        <h2 id="belonging-title">A community is a pattern of return.</h2>
        <p>
          Belonging is not abstract here. It is carried in baskets, planted in rows,
          exchanged at meals, and taught by watching someone older move through the field.
        </p>
      </div>
    </section>

    <section class="closing-section" aria-labelledby="closing-title">
      ${picture("detail", "terrace-workers-close-01", "closing-media", "100vw")}
      <div class="closing-copy">
        <p class="eyebrow">Rooted</p>
        <h2 id="closing-title">To tend a place is to be claimed by it.</h2>
        <p>
          The terrace holds the harvest. The harvest gathers the community. The community
          keeps the land alive.
        </p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Rooted</p>
    <p>Land, harvest, and belonging.</p>
  </footer>
`;

if (window.location.hash) {
  window.requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView();
  });
}
