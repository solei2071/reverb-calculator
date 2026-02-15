# Reverb / Pre-Delay / LFO Calculator

An English UI for BPM-based Delay, Reverb, and LFO timing.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Deploy on Vercel

1. Push this repo to GitHub
2. Create a new Vercel project and connect the repo
3. Keep default settings and deploy

## AdSense readiness notes

- Set the production site URL in Vercel Environment Variables:
  - `NEXT_PUBLIC_SITE_URL=https://reverb-calculator.vercel.app`
  - Replace with your own domain later (e.g. `https://www.your-domain.com`) and rebuild.
- Optional AdSense script ID:
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXX`
- Set `public/ads.txt` with your real `ca-pub-` ID after approval account is active.
- Sitemap and robots are included:
  - `app/sitemap.ts`
  - `app/robots.ts`
- Policy/brand pages:
  - `app/about/page.tsx`
  - `app/guide/page.tsx`
  - `app/faq/page.tsx`
  - `app/terms/page.tsx`
  - `app/privacy/page.tsx`
  - `app/contact/page.tsx`
- Add your Google AdSense script inside the app root if approval is needed.
- If you use `NEXT_PUBLIC_ADSENSE_CLIENT_ID`, the script is injected automatically from layout.

## Deploy verification

After deployment, confirm:

1. `https://your-domain/robots.txt` is reachable
2. `https://your-domain/sitemap.xml` is reachable
3. Main pages render and the policy pages are accessible from header/footer links
## Included features

- BPM input
- Mode switch: Delay, Reverb/Pre-Delay, LFO
- Delay table for notes with normal, dotted, triplet values
- Hz values for each entry
- Copy-ready values (click a number)
- English-only labels

## Formula

- `msPerQuarter = 60000 / BPM`
- `ms = msPerQuarter * beatValue` (`1/4` is `1`, `1/8` is `0.5`, etc.)
- `Hz = 1000 / ms`
