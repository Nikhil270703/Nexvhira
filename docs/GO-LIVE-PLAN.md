# Nexvhira go-live plan: free now, own domain later

**Goal:** put nexvhira's website online today for ₹0, then switch to your own domain later without rebuilding anything.
**Step-by-step clicks:** see `docs/DEPLOYMENT.md`. This page is the plan and the order.

## The free stack (₹0 a month)

| Need | Free service | Free limit that matters | Why this one |
|---|---|---|---|
| Code storage | GitHub (repo `Nikhil270703/Nexvhira`) | Unlimited private/public repos | Cloudflare deploys straight from it |
| Hosting | Cloudflare Workers (static assets) | Static file requests are free and unlimited | Commercial use allowed on the free plan. Vercel's free plan is non-commercial only |
| Web address (for now) | `nexvhira.<your-name>.workers.dev` | Free, with HTTPS | Comes with Cloudflare |
| Contact form | Web3Forms | 250 messages a month, no signup | Sends enquiries to the company email. Until it's set up, the form opens WhatsApp |
| Visitor stats | Cloudflare Web Analytics | Free, no cookies | No cookie banner needed |
| Company accounts | One new Gmail, e.g. `nexvhira.official@gmail.com` | Free | Owns every account above so the company never loses access |
| Found on Google | Google Search Console + Google Business Profile (Pune) | Free | Search listing and Maps listing |

## Phase 1: Today (about 1 hour, ₹0)

1. **Company Gmail.** Create it and turn on 2-step verification. Use it for every signup below.
2. **Push the code to GitHub.** Nikhil pushes the `nexvhira` folder to `main` with GitHub Desktop, or adds Vaishnavi (`Bharambevaish`) as a collaborator so she can push.
3. **Cloudflare.**
   - Sign up, open Workers & Pages, then Create, then Import a repository.
   - Nikhil approves Cloudflare's GitHub app for the repo.
   - Settings:
     - Worker name: `nexvhira`
     - Build command: `npm run build`
     - Deploy command: `npx wrangler deploy`
     - Build variables: `NODE_VERSION=22`, `SITE_URL=https://nexvhira.<name>.workers.dev`
4. **Check the live URL.** Open it on a phone and a laptop, click every product link, and send one test enquiry through the form (it opens WhatsApp).
5. **Fix `SITE_URL`** if the real workers.dev address differs from your guess, then redeploy.

Done when the site opens at the workers.dev address and every push to `main` redeploys it by itself.

## Phase 2: This week (₹0)

6. **Contact form by email.** Get a Web3Forms key with the company Gmail, paste it into `src/data/site.ts` as `web3formsKey`, push, and send a test.
7. **Visitor stats.** Turn on Cloudflare Web Analytics for the workers.dev hostname and paste the token into `cfAnalyticsToken` in `site.ts`.
8. **Google Business Profile.** Nexvhira, Pune, as a service-area business. Add the workers.dev link, phone and WhatsApp.
9. **LinkedIn company page.** Link the site, then put the page URL in `socials.linkedin` in `site.ts`.
10. **Share the link** on WhatsApp status and in client conversations. The share preview image is already built in.

Skip Google Search Console until you have the domain. Verifying a workers.dev address is possible, but you would have to redo it after the switch.

## Phase 3: When you buy the domain (one evening)

| Step | What to do |
|---|---|
| Buy | `.com` from Cloudflare Registrar (sold at cost). `.in` from an Indian registrar, then point its nameservers to Cloudflare |
| Connect | Worker `nexvhira`: Settings, then Domains & Routes, then add a custom domain (`nexvhira.com` and `www`) |
| Update | Set the `SITE_URL` build variable to `https://nexvhira.com`, then redeploy |
| Email | Cloudflare Email Routing (free): `hello@` and `nikhil@` forward to Gmail. Set up Gmail "Send mail as" so replies come from the domain |
| Analytics | Switch Web Analytics to the domain, then clear `cfAnalyticsToken` |
| Google | Add the domain in Search Console and submit `sitemap-index.xml`. Update the link on Google Business Profile and LinkedIn |
| Old address | The workers.dev address keeps working. Add a redirect only if people have bookmarked it |
| Business cards | Reprint with the website and domain email, and point the QR code to the site |

Nothing in the website code changes except `SITE_URL`.

## What it costs

- **Now:** ₹0.
- **Later:** only the domain, a yearly fee. Check the price at the registrar when you buy.
- **Optional later:** Google Workspace or Zoho for real company mailboxes once the team grows.

## Risks and how this plan handles them

- **One person owns all the accounts.** Use the company Gmail, and keep both founders as admins on Cloudflare and GitHub.
- **A bad update goes live.** Roll back in Cloudflare under Deployments, then `git revert` and push.
- **Form spam.** The form has a honeypot field; the Web3Forms limit is 250 a month.
- **The pharmacy client's login page is linked publicly.** Get Naresh Tammewar's written OK, and make sure that app has strong passwords.
