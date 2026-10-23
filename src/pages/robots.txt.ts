import type { APIRoute } from 'astro';

// Generated from the `site` URL in astro.config.mjs, so it never goes stale
// when the domain changes.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const body = `User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
