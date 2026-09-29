# osc website

The public landing page and docs for osc: an Astro + Tailwind CSS static site, served by Cloudflare Workers.

## Requirements

- **Goal:** a visitor understands what osc is in 10 seconds, trusts it, and installs it by copying one line.
- **Audience:** non-technical Windows users, plus technical people checking whether it's safe.
- **Pages:** `/` (introduction, screenshot, install, "why", FAQ), `/docs` (install and usage, kept short for non-technical users), and a 404 page. `/features` and `/how-it-works` are retired for now; re-add them (and their `nav` entries) later.
- **Tone:** humble, Apple-like. White and light-grey bands, near-black type, Apple's grey and link blue, pill buttons and "›" text links. No gradients, glows, badges, uppercase labels or icon tiles.
- **Theme:** light everywhere, except `/docs`, which is dark. It's a per-page choice (`theme` prop on `Base.astro`), not the OS setting: see the table below.
- **Quality bar:** valid HTML, WCAG AA contrast in both themes, keyboard usable, no horizontal scroll on phones, no tracking or cookies.
- **Privacy (hard rule):** the osc source is private. Nothing from it ships here, except the app icon and a screenshot. That means no code, module or file names, Telegram IDs, or internal doc names. Enforced by `scripts/privacy-guard.mjs`.

## Stack and design decisions

| Decision | Why |
|---|---|
| **Astro** (static output) | Pages built from reusable components, zero JavaScript by default, plain HTML in `dist/`. |
| **Tailwind CSS v4** with semantic tokens | Colors are defined once in `src/styles/global.css` (`bg-surface`, `text-muted`, `bg-accent`…). A page opts into the dark values with `data-theme="dark"` on `<html>` (pass `theme="dark"` to `Base.astro`, as `docs.astro` does); the OS setting is never consulted. Components never use `dark:`. |
| Apple-style look | System font (SF on Mac, Segoe UI on Windows), Apple's palette (`#1d1d1f`, `#6e6e73`, `#f5f5f7`, link `#0066cc`). |
| Content separate from layout | All copy is in `src/data/` (`site.ts`, `docs.md`). Changing text never touches components. |
| Icons: `lucide-static` | SVG strings inlined at build time, so nothing is fetched when the page loads. |
| Strict CSP in `public/_headers` | Scripts from this site only. `assetsInlineLimit: 0` keeps Astro from inlining scripts. |

## Structure

```
src/
  data/          site.ts (copy, links, FAQ) · docs.md
  styles/        global.css: Tailwind + design tokens
  layouts/       Base.astro: <head>, header, footer
  components/
    layout/      Header, Footer
    ui/          Button (pill | link), Section, Icon, InstallCommand
    sections/    Hero, Why, Faq (the home page)
  pages/         index · docs · 404
public/          favicon.ico, icon.png, screenshot.png, _headers
scripts/         privacy-guard.mjs
```

To add a page, create `src/pages/<name>.astro` and add it to `nav` in `site.ts` (it appears in the header and, via `nav`, the footer automatically).

## Develop

    npm install
    npm run dev       # http://localhost:4321, live reload
    npm run preview   # build + serve on the real Workers runtime (headers, 404) at http://localhost:8787

## Checks

`npm run check` (after `npm run build`), also run in CI on every push and PR:

1. `html-validate` on every built page (`.htmlvalidate.json`).
2. **Privacy guard:** fails if `src/`, `public/` or the built pages contain anything that only exists in the private source. Add a pattern whenever something new must never leak.

## Release checklist (manual, for visual changes)

- [ ] `npm run preview`: `/`, `/docs` and `/does-not-exist` (404) load with no console errors.
- [ ] `/` is light and `/docs` is dark, regardless of the OS setting (Windows Settings → Personalization → Colors).
- [ ] Keyboard only: skip link, nav, Copy buttons, FAQ items. 200% zoom. Phone width in DevTools.
- [ ] Lighthouse in Edge on `/` and `/docs`.

## Deploy

A push to `main` runs `.github/workflows/site.yml`: install → build → checks → `wrangler deploy`. Pull requests run everything except the deploy.

One-time setup:
1. Cloudflare dashboard → My Profile → API Tokens → create a token from the **Edit Cloudflare Workers** template.
2. GitHub repo → Settings → Secrets and variables → Actions → add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
3. The first deploy prints the site URL (`osc.<your-subdomain>.workers.dev`).

Manual deploy from your PC: `npx wrangler login`, then `npm run deploy`.

## Maintenance

- **New app version:** nothing to do. The install line always points at `releases/latest`.
- **New UI:** replace `public/screenshot.png`, cropped to the window, and update its `width`/`height` in `Hero.astro`.
- **Feature change:** edit `src/data/`. The privacy guard still runs.
- **Dependencies:** `npm outdated`, bump, then run the release checklist.
- **Later:** a custom domain (`routes` in `wrangler.jsonc`), then a short install URL through `public/_redirects`, and `og:image` (it needs an absolute URL).
