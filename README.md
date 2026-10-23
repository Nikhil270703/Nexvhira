# Nexvhira website

The company website for **Nexvhira**, a software company in Pune. It presents the services Nexvhira sells and the software it has built (three live apps and three prototypes), and takes enquiries by WhatsApp, phone, email and a contact form. It is a fully static Astro site, deployed free on Cloudflare, and most content lives in a few typed data files so the team can update it without touching page code.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) 7.3.8 (static output, TypeScript) |
| Styling | Plain CSS with design tokens (`src/styles/tokens.css`) + Astro scoped styles |
| Content | Typed data files in `src/data/` |
| Fonts | Anek Latin, Anek Devanagari, Mukta, self-hosted via `@fontsource` |
| Images | Astro `<Image>` (WebP, responsive) |
| Contact form | Web3Forms (free tier), WhatsApp fallback |
| SEO | Sitemap, generated `robots.txt`, canonical URLs, Open Graph, JSON-LD |
| Security | Strict Content-Security-Policy and headers in `public/_headers`; no inline scripts or styles |
| Hosting | Cloudflare Workers static assets, auto-deployed from GitHub |
| CI | GitHub Actions build check |

## Project layout

```
.
├── .github/workflows/ci.yml   # build check on push / pull request
├── docs/
│   ├── PLAN.md                # technical plan and decisions
│   ├── DEPLOYMENT.md          # go-live, domain, email, rollback
│   └── CONTENT-GUIDE.md       # how to add products, clients, teammates
├── public/                    # copied as-is: icons, share image, _headers
├── scripts/brand/             # regenerates logo PNGs and the share image
├── src/
│   ├── assets/products/       # product screenshots
│   ├── components/            # Header, Footer, Logo, ProductRow, ContactForm, …
│   ├── data/                  # site, products, services, clients, team, content
│   ├── layouts/               # BaseLayout (head, SEO, header, footer)
│   ├── pages/                 # one file per route; products/[slug].astro per product
│   └── styles/                # tokens.css, global.css
├── astro.config.mjs
├── wrangler.jsonc             # Cloudflare config
└── package.json
```

## Scripts

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22, see `.nvmrc`) |
| `npm run dev` | Local preview at http://localhost:4321 with live reload |
| `npm run check` | Type-check pages and data files |
| `npm run build` | `astro check` + production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run deploy` | Build and deploy with Wrangler (normally Cloudflare does this on push) |

## Local development

```bash
npm install
npm run dev
```

Set `SITE_URL` when building for production (Cloudflare does this through a build variable):

```bash
SITE_URL=https://nexvhira.example npm run build
```

## Docs

- [Technical plan](docs/PLAN.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Content guide](docs/CONTENT-GUIDE.md)
