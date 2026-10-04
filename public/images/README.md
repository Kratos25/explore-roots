# Images

Every path in `src/data/*.json` points into this folder. The files here right
now are **labelled grey placeholders** — each one is named exactly what the real
photo should be called, and shows the recommended size. Replace them one by one
and nothing in the code has to change.

## Naming

Keep lowercase, hyphenated, descriptive names. The folder tells you the section:

```
public/images/
├─ brand/      logo, light logo, og-cover (social share image)
├─ hero/       the four home page collage photos
├─ vehicles/   one photo per vehicle, filename matches the vehicle slug
├─ packages/   one photo per destination
├─ about/      about page and "why choose us" photos
└─ gallery/    photo gallery strip
```

## Recommended source sizes

| Where            | Size to export | Aspect | Notes                         |
| ---------------- | -------------- | ------ | ----------------------------- |
| Vehicle cards    | 1200 × 825     | 16:11  | Car centred, plain background |
| Package cards    | 1200 × 900     | 4:3    |                               |
| Hero collage     | 1200 × 1500    | 4:5    | Shot vertically               |
| Gallery          | 1200 × 1600    | 3:4    |                               |
| About            | 1200 × 1600    | 3:4    |                               |
| OG cover         | 1200 × 630     | 1.91:1 | Used by WhatsApp / Google     |
| Logo             | 540 × 144 PNG  | —      | Transparent background        |

Export as JPG at quality 80. Don't pre-convert to WebP — Next.js does that
automatically and serves AVIF/WebP to browsers that support it.

Keep each file under ~300 KB. Anything larger slows down the first paint on
a phone on mobile data, which is most of your traffic.
