#!/usr/bin/env python3
"""
Regenerate the PNG brand assets in public/ from the HTML templates in this folder.

    pip install playwright        # once, if it is not installed
    python -m playwright install chromium   # once, if no Chromium is available
    python scripts/brand/build-assets.py

Run from the project root after `npm install` (the templates load the Anek fonts
from node_modules). Outputs:
    public/favicon-32.png        32×32   browser tab fallback for favicon.svg
    public/apple-touch-icon.png  180×180 iPhone/iPad home-screen icon (no transparency)
    public/logo.png              512×512 logo used in search-engine structured data
    public/og-image.png          1200×630 preview image for WhatsApp, LinkedIn, etc.
"""
import asyncio
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PUBLIC = ROOT / "public"

MARK = (HERE / "mark.html").as_uri()
OG = (HERE / "og.html").as_uri()

# (output file, template url, width, height, transparent background)
JOBS = [
    ("favicon-32.png", f"{MARK}?stroke=4.8", 32, 32, True),
    ("apple-touch-icon.png", f"{MARK}?bleed=1", 180, 180, False),
    ("logo.png", MARK, 512, 512, True),
    ("og-image.png", OG, 1200, 630, False),
]


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, url, width, height, transparent in JOBS:
            page = await browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
            await page.goto(url)
            await page.evaluate("document.fonts.ready")
            await page.wait_for_timeout(300)
            out = PUBLIC / name
            await page.screenshot(path=str(out), omit_background=transparent)
            await page.close()
            print(f"wrote {out.relative_to(ROOT)} ({width}x{height})")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
