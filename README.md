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
