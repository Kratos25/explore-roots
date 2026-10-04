#!/usr/bin/env node
/**
 * Image build step.
 *
 *   assets-raw/**  (your originals, NOT committed)
 *        │
 *        │  npm run images
 *        ▼
 *   public/images/**  (resized, compressed, committed)
 *   src/data/generated/blur-map.json  (tiny base64 previews)
 *
 * Why this exists: phone camera originals are 4-8 MB each. Committing them
 * bloats the repo, slows every deploy, and Next.js still has to resize them on
 * first request. Resizing once up front means the repo stays small and the
 * first visitor doesn't pay for the conversion.
 *
 * Re-running is cheap: files are skipped unless the original is newer than the
 * output.
 */

import { readdir, stat, mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = 'assets-raw';
const OUT_DIR = path.join('public', 'images');
const BLUR_MAP = path.join('src', 'data', 'generated', 'blur-map.json');

/**
 * Max width per folder. Nothing is ever upscaled.
 * These are deliberately not huge — the widest any image is displayed on this
 * site is about 700 CSS px, and 2x that covers retina screens.
 */
const PRESETS = {
  vehicles: { width: 1400, quality: 78 },
  packages: { width: 1600, quality: 78 },
  hero: { width: 1200, quality: 78 },
  gallery: { width: 1200, quality: 78 },
  about: { width: 1200, quality: 78 },
  brand: { width: 600, quality: 90, keepPng: true },
  default: { width: 1400, quality: 78 },
};

const args = process.argv.slice(2);
const FORCE = args.includes('--force');

const stats = { converted: 0, skipped: 0, bytesIn: 0, bytesOut: 0 };
const blurMap = {};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp|tiff?|avif)$/i.test(entry.name)) yield full;
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function processFile(file) {
  const rel = path.relative(RAW_DIR, file);
  const folder = rel.split(path.sep)[0];
  const preset = PRESETS[folder] || PRESETS.default;

  const dir = path.dirname(rel);
  const ext = preset.keepPng ? '.png' : '.jpg';
  const outRel = path.join(dir, slugify(path.basename(file)) + ext);
  const outPath = path.join(OUT_DIR, outRel);
  const publicPath = '/' + path.join('images', outRel).split(path.sep).join('/');

  const srcStat = await stat(file);
  stats.bytesIn += srcStat.size;

  const upToDate =
    !FORCE &&
    (await exists(outPath)) &&
    (await stat(outPath)).mtimeMs > srcStat.mtimeMs;

  if (!upToDate) {
    await mkdir(path.dirname(outPath), { recursive: true });

    const pipeline = sharp(file)
      .rotate() // honour EXIF orientation, otherwise phone photos come out sideways
      .resize({ width: preset.width, withoutEnlargement: true });

    if (preset.keepPng) {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(outPath);
    } else {
      await pipeline
        .jpeg({ quality: preset.quality, mozjpeg: true, progressive: true })
        .toFile(outPath);
    }
    stats.converted += 1;
  } else {
    stats.skipped += 1;
  }

  stats.bytesOut += (await stat(outPath)).size;

  // 16px-wide preview, inlined as a data URI. This is what shows while the
  // real photo downloads, so there is never a blank grey box.
  const blur = await sharp(file)
    .rotate()
    .resize(16, null, { fit: 'inside' })
    .jpeg({ quality: 40 })
    .toBuffer();
  blurMap[publicPath] = `data:image/jpeg;base64,${blur.toString('base64')}`;

  return { publicPath, outPath };
}

const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';

async function main() {
  if (!(await exists(RAW_DIR))) {
    console.error(`\nNo ${RAW_DIR}/ folder found.`);
    console.error(`Create it, drop your originals into ${RAW_DIR}/vehicles, ${RAW_DIR}/packages etc, then run this again.\n`);
    process.exit(1);
  }

  const files = [];
  for await (const f of walk(RAW_DIR)) files.push(f);

  if (files.length === 0) {
    console.log(`\nNothing to do — ${RAW_DIR}/ is empty.\n`);
    return;
  }

  console.log(`\nProcessing ${files.length} image${files.length === 1 ? '' : 's'}...\n`);

  const written = [];
  for (const file of files) {
    const { publicPath } = await processFile(file);
    written.push(publicPath);
  }

  await mkdir(path.dirname(BLUR_MAP), { recursive: true });
  await writeFile(BLUR_MAP, JSON.stringify(blurMap, null, 2) + '\n');

  written.sort().forEach((p) => console.log('  ' + p));

  console.log(
    `\n${stats.converted} converted, ${stats.skipped} already up to date` +
      `\n${mb(stats.bytesIn)} in  ->  ${mb(stats.bytesOut)} out` +
      ` (${Math.round((1 - stats.bytesOut / stats.bytesIn) * 100)}% smaller)` +
      `\nBlur previews written to ${BLUR_MAP}\n` +
      `\nPaths above are what go into src/data/*.json.\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
