#!/usr/bin/env node
/**
 * Runs automatically before `npm run build`.
 *
 * Walks every image path referenced in src/data/*.json and checks the file
 * actually exists in public/images. Catches the classic "renamed the file but
 * forgot the JSON" mistake before it reaches production as a broken image.
 *
 * Warns only — it never fails the build, so a missing photo can't block a
 * deploy.
 */

import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join('src', 'data');
const PUBLIC_DIR = 'public';

const IMAGE_KEYS = new Set(['image', 'src', 'srcLight', 'card']);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function collect(node, out) {
  if (Array.isArray(node)) {
    node.forEach((n) => collect(n, out));
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (IMAGE_KEYS.has(key) && typeof value === 'string' && value.startsWith('/images/')) {
        out.add(value);
      } else {
        collect(value, out);
      }
    }
  }
}

const paths = new Set();
const files = await readdir(DATA_DIR);

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  const raw = await readFile(path.join(DATA_DIR, file), 'utf8');
  collect(JSON.parse(raw), paths);
}

const missing = [];
for (const p of paths) {
  if (!(await exists(path.join(PUBLIC_DIR, p)))) missing.push(p);
}

if (missing.length) {
  console.warn(`\n  ${missing.length} of ${paths.size} images referenced in src/data are missing from public/:\n`);
  missing.sort().forEach((p) => console.warn('    ' + p));
  console.warn('\n  Add them to assets-raw/ and run `npm run images`.\n');
} else {
  console.log(`\n  All ${paths.size} images referenced in src/data are present.\n`);
}
