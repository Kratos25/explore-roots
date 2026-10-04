# Explore Roots

Local driver-driven car rental and travel packages. Next.js 14 (App Router),
React 18, Tailwind CSS. Four pages, fully static, mobile first.

| Route              | Page            |
| ------------------ | --------------- |
| `/`                | Home            |
| `/vehicles`        | Vehicles        |
| `/travel-packages` | Travel Packages |
| `/about-us`        | About Us        |
| `/travel-packages/[slug]` | One page per package, generated from `packages.json` |

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Build and run the production version:

```bash
npm run build
npm start
```

### Environment variables

| Variable                      | Required | What it does                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | yes      | Canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph tags             |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes      | The number every Book Now button opens. Digits only, e.g. `919876543210` |
| `NEXT_PUBLIC_IMAGE_CDN_URL`   | no       | Leave empty to serve from `/public`. Set it to move every image to a CDN |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | Search Console verification token                                |

---

## Folder structure

```
src/
├─ app/                       routes, metadata, sitemap, robots
│  ├─ layout.js               fonts, header/footer, global JSON-LD
│  ├─ page.js                 Home
│  ├─ vehicles/page.js
│  ├─ travel-packages/page.js
│  ├─ about-us/page.js
│  ├─ sitemap.js  robots.js   generated at build time
│  ├─ not-found.js  error.js  loading.js
│  └─ globals.css
│
├─ components/
│  ├─ layout/                 Header (mobile nav), Footer, WhatsAppFloat
│  ├─ ui/                     Button, Container, Section, SectionHeading,
│  │                          SmartImage, Badge, JsonLd, SkipLink, icons/
│  ├─ cards/                  VehicleCard, PackageCard, StatItem, FaqItem
│  └─ sections/               Hero, StatsBar, VehicleGrid, PackageGrid,
│                             WhyChooseUs, Faq, PhotoGallery, AboutIntro,
│                             PageIntro
│
├─ data/                      ← all content lives here, no code changes needed
│  ├─ site.json               name, contact, address, nav, footer, stats
│  ├─ vehicles.json           the fleet
│  ├─ packages.json           destinations
│  ├─ faqs.json               questions and answers
│  ├─ gallery.json            photo strip
│  ├─ hero.json               home hero copy and images
│  └─ about.json              about copy, why-choose-us points
│
└─ lib/
   ├─ config.js               reads env, exposes siteConfig
   ├─ whatsapp.js             builds the prefilled wa.me links
   ├─ images.js               resolves local vs CDN image paths
   ├─ format.js               price and duration formatting
   ├─ seo.js                  buildMetadata() used by every page
   ├─ schema.js               JSON-LD builders
   └─ clsx.js                 className joiner
```

Everything you'd edit day to day is in `src/data`. The components read from
those files, so adding a vehicle is a JSON entry, not a code change.

---

## Adding a vehicle

Append an object to `src/data/vehicles.json`:

```json
{
  "id": "ertiga",
  "slug": "maruti-ertiga",
  "name": "Ertiga",
  "category": "MUV",
  "seats": 6,
  "luggage": 3,
  "transmission": "Manual",
  "fuel": "Petrol",
  "ac": true,
  "badge": "Five",
  "rating": 5,
  "instantBooking": true,
  "featured": true,
  "pricePerDay": 1500,
  "compareAtPerDay": 1900,
  "pricePerHour": 250,
  "currency": "INR",
  "bestFor": "Six people with moderate luggage",
  "features": ["Driver included", "Third row seating"],
  "image": "/images/vehicles/ertiga.jpg",
  "imageAlt": "Maruti Ertiga available for rent with driver"
}
```

- `featured: true` also puts it on the home page (home shows the first 8).
- The Vehicles page shows everything.
- Drop `ertiga.jpg` into `public/images/vehicles/` and it appears.

Packages work the same way through `src/data/packages.json`.

---

## WhatsApp booking

Every **Book Now**, **Explore Now**, **Book a ride** and the floating button
builds a `https://wa.me/<number>?text=<prefilled message>` link in
`src/lib/whatsapp.js`.

Tapping Book Now on the Eeco card opens WhatsApp already typed with:

```
Hi Explore Roots, I would like to book a vehicle.

Vehicle: Eeco
Type: Van
Seats: 5 seater
Day rate: ₹1300.00 per day
Hourly rate: ₹200.00 per hour
Reference: maruti-eeco
Seen on: Home page

Pickup location:
Drop location:
Travel date:
Number of passengers:
```

The customer fills the blank fields and sends. You receive the card details
without having to ask what they were looking at.

Three message builders are available:

| Function                    | Used by                              |
| --------------------------- | ------------------------------------ |
| `vehicleEnquiry(vehicle)`   | Vehicle cards                        |
| `packageEnquiry(pkg)`       | Package cards                        |
| `generalEnquiry(context)`   | Hero, header, floating button        |

To change the wording, edit those three functions — nothing else needs touching.

These are ordinary `<a href>` links, not click handlers, so they are server
rendered and keep working even if JavaScript fails to load. They also open the
desktop WhatsApp client correctly.

---

## Images: how to handle them

Short answer to "can we just dump them in the code": **yes, but not the
originals.** Commit resized, compressed copies — never the 6 MB files straight
off a phone or camera. There's a script that does the resizing for you.

### The workflow

```
assets-raw/            ← your originals (gitignored, never committed)
   vehicles/
   packages/hornbill-festival/
   hero/  gallery/  about/  brand/
        │
        │   npm run images
        ▼
public/images/         ← resized + compressed (committed, ~100-200 KB each)
src/data/generated/blur-map.json   ← tiny previews, auto-generated
```

1. Drop originals into the right `assets-raw/` subfolder. Name them properly
   first — the filename becomes the URL, so `innova-crysta-sela-pass.jpg`, not
   `IMG_20241103_094512.jpg`.
2. Run `npm run images`.
3. The script prints the exact `/images/...` paths. Paste them into the
   relevant `src/data/*.json` entry.

It resizes to a sensible max width per folder, strips EXIF, fixes sideways
phone photos, compresses with mozjpeg, and skips anything already up to date.
It also generates a 16px preview of every photo as base64 — that's what shows
while the real image downloads, so you get a blur-up instead of a grey box.

Typical result: 4.2 MB original → ~180 KB committed. On 40 vehicle and package
photos that's the difference between a 170 MB repo and a 7 MB one.

### Why not just put the originals in `/public`?

Next.js would still serve them correctly — it resizes on request and caches the
result. But:

- Every original is committed forever. Git stores each version, so the repo
  only grows, and `git clone` gets slower for everyone.
- Vercel's free tier meters image optimizations. Large sources burn through
  that faster and the first visitor to each page waits for the conversion.
- You lose control of quality. A 6 MB source downscaled automatically often
  looks worse than one you resized deliberately.

Resizing once up front sidesteps all three.

### When to move to a CDN

Stay on `/public` while you're under roughly 150 images and you're the one
adding them. It's free, it's fast, and `next/image` already converts to
AVIF/WebP and serves per-device sizes.

Move to Cloudinary, ImageKit or S3 + CloudFront when one of these is true:

- Someone non-technical needs to upload photos without touching the repo
- You're past a few hundred images and the build is dragging
- You want on-the-fly cropping per device

Migrating is one line — upload the contents of `public/images` keeping the same
folder paths, then set:

```bash
NEXT_PUBLIC_IMAGE_CDN_URL=https://cdn.exploreroots.in
```

Every path in the JSON resolves through `resolveImage()` in `src/lib/images.js`,
so nothing else changes. Add the host to `images.remotePatterns` in
`next.config.mjs` at the same time or Next will refuse to optimise it.

### The part that matters most

Format and hosting matter less than these three, all of which are already set
up and worth not breaking:

- **`sizes` is correct per usage** (`src/lib/images.js`). This tells the browser
  how wide the image will actually be, so a phone fetches a 400px file instead
  of a 1400px one. Wrong `sizes` is the most common cause of a slow
  image-heavy page, and it's invisible on a desktop connection.
- **Every image sits in a fixed aspect-ratio box**, so nothing shifts while
  loading.
- **Only above-the-fold images use `priority`**. Everything else loads lazily.

### Checking nothing is missing

`npm run build` runs `scripts/check-images.mjs` first, which walks every image
path in `src/data/*.json` and warns about any file that isn't in `public/`. It
warns rather than fails, so a missing photo can never block a deploy. That
catches the "renamed the file, forgot the JSON" problem before it ships.

## SEO

Built in already:

- Per-page `title`, `description`, keywords and canonical URL via
  `buildMetadata()` in `src/lib/seo.js`
- Open Graph and Twitter card tags, with a 1200×630 share image
- `sitemap.xml` and `robots.txt` generated at build time from `SITE_URL`
- JSON-LD structured data:
  - `AutoRental` + `WebSite` on every page (business details, rating, address)
  - `ItemList` of `Product` offers on the fleet, with day rates
  - `ItemList` of `TouristTrip` for packages, with itineraries
  - `FAQPage` on all three pages that carry an FAQ — this is what makes the
    questions eligible to show directly in Google results
  - `BreadcrumbList` on the inner pages
- Semantic HTML: one `<h1>` per page, real `<section>` landmarks, `<address>`,
  descriptive link text
- FAQ answers use `<details>`, so the answer text is in the HTML for crawlers
  even before anyone clicks
- All four routes prerender as static HTML (~99 kB first load JS)

Before you go live:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain, or canonicals will be wrong.
2. Replace `public/images/brand/og-cover.jpg` with a real 1200×630 image.
3. Update the address, phone and email in `src/data/site.json` — they are
   currently the placeholder values from the Figma file, and the JSON-LD
   publishes them to Google as your business address.
4. Add `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
   to `public/`.
5. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

---

## Responsive behaviour

| Breakpoint       | Layout                                                  |
| ---------------- | ------------------------------------------------------- |
| `< 640px`        | One column, hamburger drawer, gallery swipes sideways   |
| `640px – 1024px` | Two-column card grids                                    |
| `> 1024px`       | Four-column card grids, two-column FAQ, full hero collage |

Also handled: visible keyboard focus rings, a skip-to-content link, body scroll
lock while the mobile menu is open, and `prefers-reduced-motion` respected.

---

## Deploying

Vercel is the least-friction option for Next.js: import the repo, add the
environment variables, deploy. Netlify and Cloudflare Pages work too.

For a VPS:

```bash
npm ci
npm run build
npm start          # or run it under pm2 / systemd behind nginx
```

---

## Things left to wire up

- Real photos and logo (placeholders are in place and labelled)
- Real WhatsApp number in `.env.local`
- Real business address, phone and email in `src/data/site.json`
- Favicon set
- Analytics, if you want it
