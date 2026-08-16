# LearnJoyHub

Interactive learning platform for kids — spelling practice, maths worksheets,
and a numerology calculator — built with Next.js (App Router) and TypeScript.
Live at [learnjoyhub.in](https://learnjoyhub.in).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy these into `.env.local` for local development (see `src/app/layout.tsx`
and `src/utils/analytics.ts` for where they're consumed):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for metadata/sitemap/robots |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | Mixpanel analytics token |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense publisher ID (see `ADSENSE_SETUP.md`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console verification code |

All game data (word lists, progress, settings) is stored client-side in
`localStorage` — there is no backend or database.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Deployment

Deployed on [Vercel](https://vercel.com)'s free tier, connected to this
GitHub repo. Pushes to `main` deploy to production; other branches get
preview deployments.
