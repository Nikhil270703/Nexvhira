// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL of the site. Set SITE_URL in Cloudflare (Settings → Build →
// Variables) to the workers.dev URL now, and to the custom domain once bought.
// It feeds canonical links, Open Graph tags, the sitemap and robots.txt.
const SITE_URL = process.env.SITE_URL ?? 'http://localhost:4321';

if (!process.env.SITE_URL && process.argv.includes('build')) {
  console.warn(
    '\n[nexvhira] SITE_URL is not set, so canonical and sitemap URLs will point to localhost.\n' +
      '           Set it in Cloudflare → Settings → Build → Variables before going live.\n',
  );
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Keep every stylesheet and script in its own file so the strict
    // Content-Security-Policy in public/_headers never needs 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks/'),
    }),
  ],
});
