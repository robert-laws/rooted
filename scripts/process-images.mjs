import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "assets", "originals", "stock-images");
const outputDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "imageManifest.js");

const formats = [
  { ext: "avif", options: { quality: 58, effort: 6 } },
  { ext: "webp", options: { quality: 78 } },
  { ext: "jpg", options: { quality: 82, mozjpeg: true } },
];

const landscapeWidths = [2400, 1600, 960];
const detailWidths = [1600, 960, 640];

const assets = [
  {
    id: "terrace-workers-wide-01",
    group: "landscape",
    source:
      "wide_angle_of_a_terraced_rice_paddy_with_workers_--ar_32_--pr_94df0e80-0b3c-44ac-9d57-561bf4ee0074_1.png",
    alt: "Terraced rice paddies with people tending the harvest beneath misty mountain ridges.",
    focal: "center 62%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-wide-02",
    group: "landscape",
    source:
      "wide_angle_of_a_terraced_rice_paddy_with_workers_--ar_32_--pr_94df0e80-0b3c-44ac-9d57-561bf4ee0074_3.png",
    alt: "Wide green terraces with farmers moving along narrow earthen paths.",
    focal: "center 58%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-wide-03",
    group: "landscape",
    source:
      "wide_angle_of_a_terraced_rice_paddy_with_workers_--ar_32_--pr_f4648b9d-6a8a-43ff-9bb3-a5ae90c32bed_2.png",
    alt: "Layered rice terraces stretching into a soft mountain landscape.",
    focal: "center 58%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-mid-01",
    group: "landscape",
    source:
      "middle_shot_of_a_terraced_rice_paddy_with_workers_--ar_32_--p_7022bd6f-c10e-4b29-93a6-854e119134af_0.png",
    alt: "Workers gathered among bright green rice terraces.",
    focal: "center 56%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-mid-02",
    group: "landscape",
    source:
      "middle_shot_of_a_terraced_rice_paddy_with_workers_--ar_32_--p_73f44028-97f2-4eed-92f1-73bb6cc1e4f6_0.png",
    alt: "A middle view of cultivated terraces with people working the fields.",
    focal: "center 56%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-mid-03",
    group: "landscape",
    source:
      "middle_shot_of_a_terraced_rice_paddy_with_workers_--ar_32_--p_73f44028-97f2-4eed-92f1-73bb6cc1e4f6_1.png",
    alt: "People tending terraced paddies carved into a green hillside.",
    focal: "center 56%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-mid-04",
    group: "landscape",
    source:
      "middle_shot_of_a_terraced_rice_paddy_with_workers_--ar_32_--p_a53dce74-d071-42e2-ad25-aeb709934c68_3.png",
    alt: "A close hillside view of planted terraces and field workers.",
    focal: "center 56%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-workers-close-01",
    group: "detail",
    source:
      "close_up_of_a_terraced_rice_paddy_with_workers_--ar_32_--prof_1e598dfc-84fb-4c43-8ba7-b35cafa87af8_3.png",
    alt: "Close view of workers and vivid rice plants in terraced water fields.",
    focal: "center 62%",
    widths: landscapeWidths,
  },
  {
    id: "terrace-mist-01",
    group: "landscape",
    source:
      "roblaws_photograph_of_a_green_terraced_landscape_viewed_from__4d0e7f95-c278-4b00-99b3-a2b33ec12d23_3.png",
    alt: "Misty green terraced hills receding into a blue-gray valley.",
    focal: "center center",
    widths: landscapeWidths,
  },
  {
    id: "terrace-mist-02",
    group: "landscape",
    source:
      "photograph_of_a_green_terraced_landscape_viewed_from_a_POV_pe_4d0e7f95-c278-4b00-99b3-a2b33ec12d23_2.png",
    alt: "A quiet panoramic view of terraced hills under morning haze.",
    focal: "center center",
    widths: landscapeWidths,
  },
  {
    id: "rice-bowls-01",
    group: "harvest",
    source:
      "product_photographs_of_rice_--profile_qfvkf7v_--hd_--v_8.1_bef00cd5-ba3c-4bb4-bc11-a313c42eef0f_0.png",
    alt: "Wooden bowls filled with different varieties of rice.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "rice-bowls-02",
    group: "harvest",
    source:
      "product_photographs_of_rice_--profile_qfvkf7v_--hd_--v_8.1_605dc528-f4c9-4280-b75f-0381ea1d46e2_1.png",
    alt: "Rice grains arranged in rustic bowls on a textured table.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "rice-bowls-03",
    group: "harvest",
    source:
      "product_photographs_of_rice_--profile_qfvkf7v_--hd_--v_8.1_605dc528-f4c9-4280-b75f-0381ea1d46e2_2.png",
    alt: "Varieties of rice presented in wooden serving bowls.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "rice-bowls-04",
    group: "harvest",
    source:
      "product_photographs_of_rice_--profile_qfvkf7v_--stylize_400_-_34064b54-c78f-4d65-bce7-a5089c547620_3.png",
    alt: "A styled harvest photograph of rice in earthy vessels.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "rice-bowls-05",
    group: "harvest",
    source:
      "product_photographs_of_rice_--profile_qfvkf7v_--stylize_800_-_5a909226-d1b0-492b-bc17-c18c8daabc87_3.png",
    alt: "Rice varieties and grains arranged on a natural tabletop.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "seed-study-01",
    group: "detail",
    source:
      "product_photographs_of_chia_and_other_seeds_--profile_qfvkf7v_0ad00c0d-76cc-430b-8d10-5ba201c10917_2.png",
    alt: "Seeds gathered in a simple still life study.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "seed-study-02",
    group: "detail",
    source:
      "product_photographs_of_chia_and_other_seeds_--profile_qfvkf7v_85df45ed-9019-4a91-be6b-ae6c2598ffdc_1.png",
    alt: "A close harvest study of chia and small seeds.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "seed-study-03",
    group: "detail",
    source:
      "product_photographs_of_chia_and_other_seeds_--profile_qfvkf7v_b862db5d-cbf6-472a-a5c2-2f574cfa1da6_0.png",
    alt: "Assorted seeds photographed against a rustic surface.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "seed-study-04",
    group: "detail",
    source:
      "product_photographs_of_chia_and_other_seeds_--profile_qfvkf7v_ba308d8e-01a1-4dfb-a1a3-f5d37c7f93f1_3.png",
    alt: "An arranged study of small seeds and grains.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "green-onions-01",
    group: "harvest",
    source:
      "product_photographs_of_green_onions_--profile_qfvkf7v_--hd_--_24ef2f7f-3a01-4d11-96c3-edf77171d0b9_2.png",
    alt: "Green onions arranged on a deep blue textured surface.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "green-onions-02",
    group: "harvest",
    source:
      "product_photographs_of_green_onions_--profile_qfvkf7v_--hd_--_24ef2f7f-3a01-4d11-96c3-edf77171d0b9_3.png",
    alt: "Fresh green onions with roots and long stems.",
    focal: "center center",
    widths: detailWidths,
  },
  {
    id: "green-onions-03",
    group: "harvest",
    source:
      "product_photographs_of_green_onions_--profile_qfvkf7v_--hd_--_f4ffbbe7-e311-4645-9323-6231dabde096_2.png",
    alt: "A simple photograph of green onions as a harvest detail.",
    focal: "center center",
    widths: detailWidths,
  },
];

async function writeVariant(asset, width, format) {
  const input = path.join(sourceDir, asset.source);
  const groupDir = path.join(outputDir, asset.group);
  const fileName = `${asset.id}-${width}.${format.ext}`;
  const output = path.join(groupDir, fileName);

  const image = sharp(input).rotate().resize({
    width,
    withoutEnlargement: true,
  });

  if (format.ext === "jpg") {
    await image.jpeg(format.options).toFile(output);
  } else if (format.ext === "webp") {
    await image.webp(format.options).toFile(output);
  } else {
    await image.avif(format.options).toFile(output);
  }

  return `images/${asset.group}/${fileName}`;
}

async function build() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    groups: {
      landscape: [],
      harvest: [],
      detail: [],
    },
  };

  for (const asset of assets) {
    await fs.mkdir(path.join(outputDir, asset.group), { recursive: true });
    const metadata = await sharp(path.join(sourceDir, asset.source)).metadata();
    const widths = asset.widths.filter((width) => width <= metadata.width);
    const variants = {};

    for (const format of formats) {
      variants[format.ext] = [];
      for (const width of widths) {
        const src = await writeVariant(asset, width, format);
        variants[format.ext].push({ width, src });
      }
    }

    manifest.groups[asset.group].push({
      id: asset.id,
      alt: asset.alt,
      width: metadata.width,
      height: metadata.height,
      focal: asset.focal,
      variants,
    });
  }

  const module = `export const imageManifest = ${JSON.stringify(manifest, null, 2)};\n`;
  await fs.writeFile(manifestPath, module);

  const totalVariants = assets.length * formats.length;
  console.log(`Processed ${assets.length} source images into ${totalVariants} responsive format sets.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
