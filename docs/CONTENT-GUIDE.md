# Content guide: updating the Nexvhira website

Almost everything on the site comes from a few data files in `src/data/`. Edit a file, push to `main`, and Cloudflare rebuilds the site in a minute or two. You rarely need to touch the pages themselves.

| To change… | Edit |
|---|---|
| Company details, contact, Udyam number, form key, social links | `src/data/site.ts` |
| Products and prototypes | `src/data/products.ts` (+ a screenshot in `src/assets/products/`) |
| Services | `src/data/services.ts` |
| Clients | `src/data/clients.ts` |
| Team | `src/data/team.ts` |
| "How a project runs" steps and the FAQ | `src/data/content.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |

The allowed fields for each item are defined in `src/data/types.ts`. If you misspell a field or leave out a required one, `npm run build` stops with an error that names the file and line, so a mistake can't reach the live site.

---

## The honesty rule

Everything on this site is something a visitor could check. So:

- **Features**: list only what can be seen in the live app or the code. No "coming soon" features in the feature list.
- **Clients**: name a client only after they agree to be named. Never add example or placeholder clients.
- **Quotes / testimonials**: only the client's own words, with their permission. Don't polish them into marketing copy.
- **Numbers**: only countable facts ("three apps live today"), never estimates like "100+ happy clients".
- **Registration**: don't write "registered" or "Pvt Ltd" until it is true.

---

## Add or edit a product

1. Take a screenshot of the product's home or main screen at about **1280×800**, using demo data only (never a real client's customers, prices or invoices). Save it as a JPG or PNG in `src/assets/products/`, for example `driving-school.jpg`.
2. Open `src/data/products.ts`. At the top, import the screenshot next to the others:

   ```ts
   import drivingShot from '../assets/products/driving-school.jpg';
   ```

3. Add an object to the `products` array (the order of the array is the order on the site):

   ```ts
   {
     slug: 'driving-school',                 // used in the URL: /products/driving-school/
     name: 'Driving School App',
     tagline: 'One plain sentence: what it is and who it is for.',
     industry: 'Driver training',            // shown as "Built for driver training"
     status: 'live',                         // 'live' (anyone can open it) or 'prototype' (demo on request)
     summary: 'Two or three sentences for the top of the product page.',
     problem: 'The everyday problem it solves, in the customer’s words.',
     users: ['School owner', 'Instructors', 'Learners'],
     features: [
       'Only features you can show working',
     ],
     languages: ['English', 'मराठी'],        // optional
     tech: ['Next.js', 'PostgreSQL'],        // optional, only if certain
     liveUrl: 'https://…',                   // optional: the running app
     liveLabel: 'Open the live app',         // optional: text of that link
     codeUrl: 'https://github.com/…',        // optional: public source code
     client: { person: 'Full Name', business: 'Business Name' }, // optional, only with permission
     screenshot: drivingShot,                // optional
     screenshotAlt: 'What the screenshot shows, for screen readers',
     featured: true,                         // true = also shown on the home page
   },
   ```

4. Save, preview (see below), push. The product page, the products list, the home page, the footer and the sitemap all update by themselves.

To **hide** a product, delete its object (and its import). To move a prototype to live, change `status` to `'live'` and add `liveUrl` and a screenshot.

## Add a client

Only after they agree to be listed. In `src/data/clients.ts`:

```ts
{
  person: 'Full Name',
  business: 'Business Name',
  industry: 'Their industry',
  product: 'product-slug',       // optional: which product we built for them
  quote: 'Their exact words.',   // optional: only with permission
},
```

If you built them a product, also set `client` on that product in `products.ts`.

## Add a teammate

In `src/data/team.ts`, add:

```ts
{ name: 'Full Name', role: 'Job title', bio: 'Optional, in their own words', linkedin: 'https://…', github: 'https://…' },
```

The About page lists everyone in this array, in this order.

## Udyam number, contact details, form key

All in `src/data/site.ts`:

- `udyamNumber`: after Udyam MSME registration, paste the number (for example `'UDYAM-MH-26-0000000'`). The footer shows it automatically. While it's `''`, nothing is shown.
- `email`, `phone` (international format without spaces, e.g. `'+917666781458'`), `phoneDisplay` (how it is written on the page), `city`.
- `web3formsKey`: the contact-form key from web3forms.com (see `docs/DEPLOYMENT.md`, step 4). While it's `''`, the form opens WhatsApp instead.
- `cfAnalyticsToken`: Cloudflare Web Analytics token, only while the site is on workers.dev.
- `socials`: LinkedIn, GitHub, Instagram URLs. Fill them in as the company accounts are created; leave unused ones as `''`.
- `legalName`: change to the registered name only once registration is complete.

---

## Preview on your computer

You need Node.js 22 (`node -v` should print `v22.x`).

```bash
npm install        # first time only, or after package.json changes
npm run dev        # opens a live preview at http://localhost:4321
```

The preview reloads as you save files. Stop it with Ctrl+C.

Before pushing, run:

```bash
npm run build
```

It runs `astro check` (types and data files: missing fields, typos, wrong values) and then builds the real site into `dist/`, optimising images and generating the sitemap. If it prints errors, fix them before pushing; Cloudflare runs the same command and won't deploy a failing build.

To regenerate the logo PNGs and the share image after a brand change, see `scripts/brand/build-assets.py`.
