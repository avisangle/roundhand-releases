# Roundhand landing page

Next.js 16 (App Router) + Tailwind v4 + shadcn/ui + Motion, deployed on Vercel.

## Develop

    npm install
    npm run dev

## Design

Read `DESIGN.md` before any visual change. Colours live only in `app/globals.css`;
`npm run lint` fails on inline colours.

## Deploy on Vercel (continuous deployment)

Deploys run through Vercel's Git integration. There are no workflow files or tokens in
the repo. One-time setup:

1. In Vercel, choose **Add New → Project** and import `avisangle/roundhand-releases`.
   Allow the Vercel GitHub app access to that repo.
2. Set **Root Directory** to `site`. Leave the framework preset on Next.js; build
   settings come from `vercel.json`.
3. Add environment variables for Production (and Preview if you want previews to accept
   signups). See `.env.example`:
   - `WAITLIST_WEBHOOK_URL` (required): signups are POSTed here as JSON. Without it,
     production refuses signups instead of dropping them.
   - `WAITLIST_WEBHOOK_SECRET` (optional): sent as a Bearer token.
   - `NEXT_PUBLIC_SITE_URL`: the canonical URL, for Open Graph tags.
4. Under **Analytics** and **Speed Insights**, enable both.

After setup:

- **Every push to `main`** deploys to production.
- **Every other branch and pull request** gets its own preview URL.
- **Lint gates the build:** `npm run lint`, including the inline-colour check, runs
  before `next build`, so a failing lint blocks the deploy.
- **Unchanged site, no build:** commits that don't touch `site/` (for example, an
  `appcast.xml` update) are skipped by `ignoreCommand`.

## Shipping a new macOS build

Update `VERSION` in `lib/site.ts` and the `/download` redirect in `vercel.json`. Both must match `appcast.xml` in the repo root.
