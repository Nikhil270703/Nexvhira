# Deploying the Nexvhira website

This guide takes the site from this folder to a live URL, then to your own domain. Follow the steps in order. Exact button names in the Cloudflare dashboard change from time to time, so where a label may differ it says "something like".

**What you need:** a GitHub account with write access to `Nikhil270703/Nexvhira`, and a Cloudflare account (free).

> **Use a company-owned email for every account** (Cloudflare, Web3Forms, Google Search Console). Make a dedicated Gmail such as `nexvhira.official@gmail.com` (or use the domain email later), and turn on two-step verification everywhere. That way the company never loses access when someone leaves.

---

## 1. Put the code on GitHub

The repository `https://github.com/Nikhil270703/Nexvhira` is empty. The default branch should be **`main`**.

Only someone with write access can push. If Nikhil isn't the one pushing, he adds the other person first: on GitHub, **Nexvhira → Settings → Collaborators → Add people**.

### Option A: GitHub Desktop (easiest)

1. Install GitHub Desktop and sign in with the GitHub account that has access.
2. **File → Clone repository → URL**, paste `https://github.com/Nikhil270703/Nexvhira.git`, choose an empty folder, click **Clone**.
3. Copy everything from the website folder into that cloned folder, **except** `node_modules/` and `dist/` (the `.gitignore` excludes them anyway).
4. Back in GitHub Desktop, type a summary such as `Nexvhira website v1` and click **Commit to main**.
5. Click **Publish branch** (or **Push origin**).

### Option B: command line

From inside the website folder:

```bash
git init -b main                 # skip if the folder already has a .git folder
git add .
git commit -m "Nexvhira website v1"
git remote add origin https://github.com/Nikhil270703/Nexvhira.git
git push -u origin main
```

If Git asks for a password, use a GitHub personal access token or GitHub Desktop instead; GitHub no longer accepts account passwords for Git.

---

## 2. Go live on a free Cloudflare URL (about 10 minutes)

The site is static. Cloudflare builds it from GitHub and serves it from its global network, free, with commercial use allowed.

1. Sign up at `dash.cloudflare.com` with the company email.
2. In the left menu open **Workers & Pages** (under something like **Compute**) → **Create application** → **Import a repository** (or **Connect to Git**).
3. Connect GitHub. Cloudflare installs its GitHub app; **the repo owner (Nikhil) must approve it** for the `Nexvhira` repository.
4. Pick the `Nexvhira` repository and fill in:

   | Setting | Value |
   |---|---|
   | Project / Worker name | `nexvhira` (must match `"name"` in `wrangler.jsonc`) |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root / path | `/` (leave empty if it's the default) |

5. Open **Advanced settings → Build variables** (or similar) and add:

   | Variable | Value |
   |---|---|
   | `SITE_URL` | `https://nexvhira.<your-subdomain>.workers.dev` (a guess is fine for the first build) |
   | `NODE_VERSION` | `22` |

6. Click **Save and Deploy**. The first build takes 1–3 minutes.
7. When it finishes, Cloudflare shows the real address, something like `https://nexvhira.<your-subdomain>.workers.dev`. If it differs from your guess, go to the Worker's **Settings → Build → Variables**, correct `SITE_URL`, then **Retry/Redeploy** the latest build. `SITE_URL` controls canonical links, the share preview, `sitemap-index.xml` and `robots.txt`.

From now on, **every push to `main` rebuilds and redeploys the site automatically.**

**What `npm run build` does:** it runs `astro check` (catches type errors and broken data in `src/data/`) and then builds `dist/`. If the check fails, nothing is deployed and the live site stays as it was.

**GitHub Actions (`.github/workflows/ci.yml`)** runs the same build on every push and pull request. It's a safety net that shows a red ✗ on GitHub; Cloudflare builds independently and does not wait for it.

---

## 3. Preview changes before they go live

- In the Worker's build settings, turn on something like **Builds for non-production branches**. Push work to a branch (for example `new-product`), and Cloudflare builds it and gives a preview URL, using `npx wrangler versions upload` as the non-production deploy command. Merge to `main` when it looks right.
- From a computer: `npm install`, then `npm run build && npx wrangler versions upload` uploads a preview version without making it live (Wrangler asks you to log in the first time).
- To check locally without Cloudflare: `npm run dev`, then open `http://localhost:4321`.

---

## 4. Turn on the contact form (Web3Forms)

Until this step, the contact form opens WhatsApp with the visitor's message filled in. That works, but email enquiries are better for records.

1. Go to `web3forms.com`, enter the company email and create an access key. The key arrives by email. The free plan allows 250 submissions a month and needs no account.
2. Open `src/data/site.ts` and paste it into `web3formsKey: '...'`.
3. Commit and push. Send yourself a test enquiry from the live site.

The access key is **public by design**. It sits in the page's HTML, and all it can do is send messages to your inbox. Someone could copy it to send you junk; locking it to your domain is a paid Web3Forms feature. The form also has a hidden "honeypot" field that bots fill in and people never see, which stops most automated spam.

---

## 5. Turn on visitor statistics (Cloudflare Web Analytics)

Cookie-free, so no cookie banner is needed.

- **While the site is on workers.dev:** Cloudflare dashboard → something like **Analytics & Logs → Web Analytics → Add a site** → enter the workers.dev hostname → copy the `token` value from the snippet it shows → paste it into `cfAnalyticsToken` in `src/data/site.ts` → push. The Content-Security-Policy already allows Cloudflare's analytics script.
- **After the custom domain runs through Cloudflare (step 6):** enable automatic setup for the domain in Web Analytics, then set `cfAnalyticsToken` back to `''` and push, so the beacon isn't added twice.

---

## 6. Connect your own domain (when decided)

1. Check `nexvhira.com` and `nexvhira.in` availability.
2. Buy it:
   - **`.com`**: Cloudflare Registrar sells it at cost (dashboard → **Domain Registration → Register Domains**). It's added to your account automatically.
   - **`.in`**: Cloudflare Registrar doesn't sell `.in`. Buy it from another accredited registrar, then in Cloudflare choose **Add a domain** (free plan) and change the domain's nameservers at the registrar to the two Cloudflare nameservers it shows. Wait until Cloudflare says the domain is **Active** (minutes to a few hours).
3. Worker `nexvhira` → **Settings → Domains & Routes → Add → Custom domain** → enter `nexvhira.com` (and add `www.nexvhira.com` too if you want it). Cloudflare creates the DNS record and SSL certificate.
4. Change the `SITE_URL` build variable to `https://nexvhira.com` (no trailing slash) and redeploy.
5. Update the domain everywhere else: Web3Forms needs no change; update Search Console, Google Business Profile and LinkedIn.

---

## 7. Email on the domain (free)

1. Domain in Cloudflare → **Email → Email Routing** → enable it (Cloudflare adds the MX and SPF records).
2. Create addresses such as `hello@nexvhira.com` and `nikhil@nexvhira.com`, each forwarding to a Gmail inbox (Gmail confirms the destination by email).
3. To **reply from** `hello@nexvhira.com` in Gmail: Google Account → turn on 2-Step Verification → create an **App Password**; then Gmail → **Settings → Accounts and Import → Send mail as → Add another email address**, SMTP server `smtp.gmail.com`, port `587`, your Gmail address as username, the App Password as password.
4. Add Google to the domain's SPF record so these emails aren't marked spam. A domain may have **only one** SPF record, so edit the existing one rather than adding a second:
   `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`
5. When the team grows, move to Google Workspace or Zoho Mail for real mailboxes.

---

## 8. After launch

- **Google Search Console**: add a *Domain* property, verify with the DNS TXT record (Cloudflare can add it for you), then **Sitemaps → submit** `https://<your-domain>/sitemap-index.xml`.
- **Google Business Profile**: create a profile for Nexvhira, Pune (service-area business if you have no public office), and link the website.
- **LinkedIn**: create the company page and link the website. Then add the URL to `socials.linkedin` in `src/data/site.ts`.
- **After Udyam registration**: put the number in `udyamNumber` in `src/data/site.ts`; the footer shows it automatically.

---

## 9. Undo a bad release (rollback)

1. **Emergency:** Worker `nexvhira` → **Deployments** → choose the last good version → **Rollback**. The old version is live within seconds (Cloudflare keeps the last 100).
2. **Make it stick:** the next push to `main` redeploys whatever is in Git, which would undo the dashboard rollback. So also revert the bad change in Git:

   ```bash
   git revert <bad-commit-id>
   git push
   ```

   (In GitHub Desktop: **History** → right-click the commit → **Revert changes in commit** → **Push origin**.)

---

## 10. Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with a Node.js version error | Check the `NODE_VERSION` build variable is `22`. Astro is pinned to 7.3.8, which needs Node ≥ 22.12. Don't upgrade to Astro 7.4+ unless the build uses Node ≥ 22.23.4 (or set `NODE_VERSION` to 24). |
| Build fails in `astro check` | The log names the file and line, usually a typo in `src/data/*.ts` (missing comma or quote). Fix it and push again. |
| Canonical links or the sitemap show `localhost` | `SITE_URL` isn't set in Cloudflare's build variables. Set it and redeploy. |
| A new third-party script, font or embed doesn't load | The Content-Security-Policy in `public/_headers` blocks anything not listed. Add the service's domain to the right directive (`script-src`, `connect-src`, `img-src`, `frame-src`…) and push. Never add `'unsafe-inline'`. |
| Contact form says it was sent but no email arrives | Check spam; check the key in `site.ts` matches the one Web3Forms emailed; check the monthly limit (250 on the free plan). |
| Contact form opens WhatsApp instead of sending | `web3formsKey` is empty. See step 4. |
| Custom domain shows an SSL or "not found" error | Wait until the domain is **Active** in Cloudflare and the custom domain shows a certificate; it can take up to an hour. |
| Old content still showing | Hard-refresh the browser (Ctrl+Shift+R). Built files are cached for a year, but each build gives them new names, so the HTML always picks up new versions. |
