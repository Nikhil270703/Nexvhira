# Nexvhira website: technical plan

Owner: Nikhil Raghuwanshi (Founder & CEO) · Prepared by: technical lead (Claude) · **Status: v2, approved with changes** (independent review, 23 Oct 2026)

## 1. Goal

A fast, credible company website for **Nexvhira**, a Pune software company. It presents the services it sells and the software it has already built, gets enquiries by form, WhatsApp, phone and email, and is easy for a two- or three-person team to update without a developer's help every time.

Out of scope for now, on the owner's instruction: domain name, teammates, business cards. The code is built so each one is a single data edit when it arrives.

## 2. Facts the site will use (and nothing beyond them)

| Item | Value | Source |
|---|---|---|
| Company | Nexvhira (no "Pvt Ltd"; Udyam MSME registration planned, not done) | owner |
| City | Pune, Maharashtra, India | owner |
| Founder | Nikhil Raghuwanshi, Founder & CEO | owner |
| Email | nraghuvanshi100@gmail.com | owner |
| Phone / WhatsApp | +91 76667 81458 | owner |
| GitHub repo | https://github.com/Nikhil270703/Nexvhira (empty) | owner |
| Services | Custom software · Websites & web apps · Data analytics & dashboards · AI/ML solutions · Basic security reviews | owner ("yes, all of these"); security wording narrowed after review |
| Real client | Naresh Tammewar (Naresh Enterprises / Tammewar Pharmacy) | owner |

**Live products (3)**, in the owner's order

1. **Pharmacy Distribution ERP**, built for Naresh Enterprises (Tammewar Pharmacy). Live: https://tammewar-pharmacy.pages.dev/
   Verified on the live app: sign-in screen "Naresh Enterprises · Distribution Management ERP · Shop Manager: sign in to manage stock and orders"; owner email sign-in; English/मराठी toggle; light/dark mode; can be added to a phone's home screen. The app sets `noindex`. Nothing beyond "stock and orders" is claimed.
2. **Flour Mill**: milling orders, dues and receipts. Live: https://feed-mill-management-system-production.up.railway.app/
   Verified: mobile number + 4-digit PIN customer login; queued → milling → ready with a ready notice; receipt slip per order; cash/UPI with total/paid/balance; per-kg rate table by grain and fineness; owner dashboard with queue counts, total outstanding, "Remind all", day's accounts; English/मराठी.
3. **AuraEdu** (owner calls it the driving school app; to be confirmed): institution management suite. Live: https://aura-edu-eight.vercel.app/
   Features described as listed on its own site. Module counts and uptime figures from its landing page are **not** repeated.

**Prototypes (3)**, labelled "Prototype, demo on request"

4. **Legal Case Outcome Predictor**: InLegalBERT, Streamlit, Supabase. No public link.
5. **SafeLinker**: phishing URL detection. No public link.
6. **Customer Segmentation Analytics**: Python, pandas, scikit-learn K-Means, Excel; 10,000 bank customer records; code at https://github.com/Bharambevaish/Fintech-Customer-Segmentation.

**Honesty rules for content.** No invented clients, logos, testimonials, ratings, project counts or registration claims. No "6 products built" figure; the site says "three apps live today". "Built for" lines name only industries with a shipped app (pharmacy distribution, flour milling, education) and never imply extra clients. Naresh Enterprises is the only named client. The owner's request to "add some clients" was declined for this reason.

## 3. Tech stack (decision + why)

| Layer | Choice | Why | Rejected |
|---|---|---|---|
| Framework | **Astro 7.3.8** (static output, TypeScript), pinned exact with lockfile | Zero JS by default, fast on Indian mobile networks; file-based pages; easy to edit. **Pinned to 7.3.8** because 7.4.x refuses to build on Node below 22.23.4 | Next.js (heavier); plain HTML (copy-pasted header/footer) |
| Styling | Plain CSS with design tokens (`src/styles/tokens.css`) + Astro scoped styles | No build-tool lock-in, full control of the look | Tailwind |
| Content | Typed data files in `src/data/*.ts` | A product, client or teammate = one object; `astro check` catches mistakes | CMS (later, if needed) |
| Fonts | Self-hosted Anek Latin / Anek Devanagari (Ek Type) + Mukta via `@fontsource` | Latin and Devanagari from the same design family; no third-party font requests | Google Fonts CDN |
| Images | Astro `<Image>` → WebP, responsive widths | Sharp screenshots, small files | Raw JPG/PNG |
| Contact form | **Web3Forms** (free 250 submissions/month, no signup) with a **honeypot** spam field; WhatsApp pre-filled message while no key is set | No server needed; works on day one | Own backend; Formspree (50/month); hCaptcha (needs a third-party script) |
| SEO | `@astrojs/sitemap`, `robots.txt` generated from the site URL, canonical URLs, Open Graph image, JSON-LD `ProfessionalService` | Proper Google results and WhatsApp/LinkedIn previews | — |
| Security | Strict CSP and headers in `public/_headers`; **no inline code** (`build.inlineStylesheets: 'never'`, `vite.build.assetsInlineLimit: 0`, no `style=""`, `is:inline` or `define:vars`); HSTS **without** `preload` | Blocks injected scripts; nothing on the site needs `unsafe-inline` | Astro's built-in CSP (would stack with `_headers`) |
| Analytics | Cloudflare Web Analytics (cookie-free). On workers.dev the beacon is added from `cfAnalyticsToken` in `site.ts`; after the domain is proxied by Cloudflare, automatic setup replaces it | No cookie banner | Google Analytics |
| Hosting | **Cloudflare Workers static assets** via Workers Builds from GitHub | Free plan, static requests free and unlimited; custom domain, SSL and email routing in one dashboard; deploys on every push | **Vercel Hobby**: non-commercial use only. GitHub Pages: no header control |
| Build on Cloudflare | Build command `npm run build` (= `astro check && astro build`); deploy command `npx wrangler deploy`; `SITE_URL` and `NODE_VERSION=22` as build variables | Type errors stop the deploy, because Workers Builds deploys whatever GitHub Actions says | — |
| CI | GitHub Actions runs the same build on push/PR | Safety net and PR feedback; it does **not** gate Cloudflare | — |
| Node | 22 (`.nvmrc`); Cloudflare's build image defaults to a newer Node, so `NODE_VERSION=22` is set explicitly | Matches the Astro pin | — |

**Site URL in one place.** `SITE_URL` (build variable) feeds `astro.config.mjs` → canonical links, Open Graph URLs, sitemap and the generated `robots.txt`. The `name` in `wrangler.jsonc` (`nexvhira`) must match the Worker name in the Cloudflare dashboard.

## 4. Site map

| Route | Purpose |
|---|---|
| `/` | Bilingual hero with real product screens, "built for" line, live products, prototypes, services, how a project runs, FAQ, contact band |
| `/products/` | Live products, then prototypes (no filters; six items don't need them) |
| `/products/<slug>/` | Problem, verified features, who uses it, languages/tech, screenshot, live link or "demo on request", client (if any) |
| `/services/` | Five services with deliverables and real examples |
| `/about/` | What Nexvhira does, how it works, founder (team grows from `team.ts`), client |
| `/contact/` | Form (Web3Forms or WhatsApp fallback) + WhatsApp, phone, email, city |
| `/thanks/` | After-form page (no-JS path), `noindex` |
| `/privacy/` | DPDP-style notice: data collected and why, processors (Web3Forms, Cloudflare, WhatsApp/Meta, Gmail), retention, rights, grievance contact, Data Protection Board |
| `/terms/` | Short website terms |
| `/404` | Branded not-found page (`not_found_handling: "404-page"`) |

## 5. Folder structure

```
nexvhira/
├── .github/workflows/ci.yml        # build check on every push / PR
├── docs/  PLAN.md  DEPLOYMENT.md  CONTENT-GUIDE.md
├── public/                         # copied as-is to the site root
│   ├── favicon.svg  favicon-32.png  apple-touch-icon.png  logo.png  og-image.png
│   └── _headers                    # CSP, HSTS and caching
├── scripts/brand/                  # templates + script that regenerate the PNG icons and share image
├── src/
│   ├── assets/products/            # product screenshots (optimised at build)
│   ├── components/                 # Header, Footer, Logo, Icon, BrowserFrame, ProductRow, CtaBand, ContactForm
│   ├── data/                       # site.ts, products.ts, services.ts, clients.ts, team.ts, content.ts, types.ts
│   ├── layouts/BaseLayout.astro    # <head>, SEO, JSON-LD, header/footer
│   ├── pages/                      # routes from section 4, plus robots.txt.ts
│   └── styles/                     # tokens.css, global.css
├── astro.config.mjs  wrangler.jsonc  tsconfig.json  .nvmrc  .gitignore
└── package.json / package-lock.json  README.md
```

## 6. Brand

- **Logo**: an "N" whose last stroke rises into an arrow (next, forward), on a navy tile, plus the lowercase wordmark "nexvhira" in Anek Latin.
- **Colours**: navy `#0B1D36` (ink), teal `#0A6E70` (links, buttons, Marathi lines), bright teal `#13A3A0`, glow teal `#5EE0CF` (on navy), mist `#EAF2F4`, marigold `#F3A712` (the "Live" dot only).
- **Type**: Anek Latin (wide, for headings and wordmark), Anek Devanagari (Marathi lines), Mukta (body).
- **Tagline**: "Software that speaks the language of your business." / "तुमच्या व्यवसायाच्या भाषेत बोलणारे सॉफ्टवेअर"

## 7. Build plan (who does what)

File ownership was fixed before parallel work started, so agents never edit the same file.

1. **Lead**: data types and files, design tokens, `BaseLayout`, Header/Footer, shared components, home page, `public/_headers`, and the only one allowed to touch `package.json`, the lockfile and `astro.config.mjs`.
2. **Agent A**: `/products/` and `/products/<slug>/`.
3. **Agent B**: services, about, contact (form posts only to `api.web3forms.com`, already allowed in `_headers`), thanks, privacy, terms, 404.
4. **Agent C**: logo PNGs, favicon, share image (`scripts/brand/`), docs, CI.
5. **Fresh verifier agent** (has not seen the build): `npm run build`; search `dist/` for inline scripts/styles; open pages in a headless browser on localhost and check the console for CSP errors and cookies; check every internal link; check external links with a web fetch tool (the container shell cannot reach arbitrary sites); compare every product claim with section 2; screenshots at 375 px and desktop; keyboard and contrast basics.
6. **Lead**: fixes, commit, copy to the local folder, publish a preview, push (or hand the owner the push steps).

## 8. Deployment plan (detail in DEPLOYMENT.md)

1. **Code on GitHub**: push to `Nikhil270703/Nexvhira`, branch `main` (GitHub Desktop recommended).
2. **Go live on a free URL**: Cloudflare → Workers & Pages → import the repo (repo owner authorises Cloudflare's GitHub app) → build `npm run build`, deploy `npx wrangler deploy`, variables `SITE_URL`, `NODE_VERSION=22`.
3. **Contact form**: Web3Forms key into `site.ts`.
4. **Analytics**: Cloudflare Web Analytics token into `site.ts` while on workers.dev.
5. **Domain (later)**: `.com` via Cloudflare Registrar at cost; `.in` from another registrar with nameservers pointed to Cloudflare; add as custom domain; update `SITE_URL`.
6. **Email on the domain**: Cloudflare Email Routing → Gmail.
7. **Discoverability**: Search Console, Google Business Profile (Pune), LinkedIn page.
8. **After Udyam registration**: number into `site.ts`; then business cards and teammates.

**Rollback**: in an emergency, roll back in the Cloudflare dashboard (any of the last 100 versions). That is temporary: the next push to `main` redeploys, so make the fix permanent with `git revert <commit>` and push.

## 9. Technical recommendations for the owner (outside this repo)

1. **AuraEdu is on Vercel's Hobby plan**, which allows only non-commercial use. Move it to Cloudflare or Vercel Pro before selling it.
2. **Naresh Enterprises' app is a private client system** (it sets `noindex`). Get Naresh Tammewar's written OK to be named, linked and screenshotted. Linking the live sign-in page makes it easy for bots to find; `nofollow` does not hide it. Better: link a demo copy with dummy data, and make sure the real app has strong passwords and login rate-limiting.
3. **Flour Mill uses 4-digit PINs.** Confirm it locks an account after repeated wrong PINs before promoting the link widely.
4. **Security reviews**: only on systems the client owns, with written permission (unauthorised access is an offence under the IT Act). Don't call it a "pen-test" or "certified".
5. Use a dedicated company Gmail (not a personal one) to own the Cloudflare, Web3Forms and Search Console accounts, with 2FA on all of them.
6. Once the domain exists, move products to branded subdomains (for example `flourmill.nexvhira.com`).

## 10. Open decisions (owner)

- Is AuraEdu the "driving school app", or is that a separate product (link + 2–3 lines)?
- Keep the Customer Segmentation Analytics prototype or hide it? (Its code is on Vaishnavi Bharambe's GitHub; credit her if kept.)
- Spelling of the founder's surname: "Raghuwanshi" (site) vs "raghuvanshi" (email address).
- Naresh Tammewar's written OK to be named and linked; optionally a quote in his own words.
- Privacy page wording to confirm: enquiries kept for 12 months if no project follows; grievance replies within 7 days.
- Domain, teammates, business cards, Udyam number: waiting, per the owner.
