# Zeeshan Jamil — Portfolio

Personal portfolio for Zeeshan Jamil, Senior Full-Stack Software Engineer (React & Node.js).

Built with **Next.js 16 (App Router, Cache Components)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No UI library, no animation library — motion uses CSS (scroll-driven animations with graceful fallback) and small client components.

## Features

- Dark-first design with a light theme (respects system preference, no flash on load)
- Home page: hero with an interactive system-map illustration, quick facts, selected work (MyDriverBook flagship, LogELD), process stepper, services, toolkit, about, experience, contact
- Case studies at `/work/mydriverbook` and `/work/logeld` with real product imagery, a conceptual HOS explainer and a click-to-play product video
- Contact form with client + server validation, rate limiting, honeypot and a `mailto:` fallback; it never shows "sent" unless delivery succeeded
- Optional AI portfolio assistant grounded in the site content; runs in a clearly labeled offline mode when no AI key is set
- SEO: metadata, generated Open Graph images (site + each case study), sitemap, robots, manifest, icons, Person/WebSite JSON-LD
- Accessibility: skip link, keyboard-friendly menu/tabs/dialog, visible focus, labeled forms, reduced-motion support

## Getting started

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # fill in what you need (all optional locally)
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (run `npx next typegen` first on a fresh clone) |
| `npm run check` | Lint + typecheck + build |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Final site URL, e.g. `https://zeeshanjamil.vercel.app`. Enables canonical URLs and absolute OG/sitemap URLs. |
| `RESEND_API_KEY` | For the contact form | API key from [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL` | For the contact form | Sender, e.g. `Portfolio <onboarding@resend.dev>` (testing) or `Portfolio <hello@your-domain.com>` (verified domain). |
| `CONTACT_TO_EMAIL` | No | Inbox that receives messages. Defaults to the email in `src/content/profile.ts`. |
| `AI_API_KEY` | For AI mode | Key for any OpenAI-compatible API (OpenAI, Groq, OpenRouter, …). |
| `AI_MODEL` | For AI mode | Model name for that provider. |
| `AI_BASE_URL` | No | Defaults to `https://api.openai.com/v1`. |
| `AI_PROVIDER_NAME` | No | Label shown in the assistant header. |

Secrets are only read on the server (`src/app/api/*`). Never prefix them with `NEXT_PUBLIC_`.

## Editing content

All copy lives in `src/content/`:

- `profile.ts` — name, email, LinkedIn, GitHub (`github: null` hides it), CV path, hero text, quick facts, about, experience, navigation
- `projects.ts` — every project: summary, period, tags, images, link state and case-study sections
- `capabilities.ts` — skills, services and the "How I build" steps

**Project links** use a `status`:

- `"live"` + `url` → rendered as an external link
- `"private"` → lock icon with the `note`
- `"unavailable"` → shows the `note` (e.g. "details available on request")

To publish a missing link, set `status: "live"` and the `url`.

**Images** go in `public/work/<slug>/` and are referenced in `projects.ts` with width, height, alt text, caption and source.

**CV**: replace `public/Zeeshan_Jamil_CV.pdf` (or set `cvPath: null` to hide download buttons).

**Case-study TODOs**: each case study has `pendingConfirmation` items. They show as a yellow box in development only and are hidden in production.

## Deploying to Vercel

1. Import the GitHub repo in Vercel (framework is auto-detected as Next.js).
2. Add the environment variables above (Production + Preview).
3. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy.

Notes:

- Rate limiting is in-memory per server instance (best effort). For stricter limits use a shared store such as Upstash Redis.
- The MyDriverBook video streams from mydriverbook.com when played. To self-host it, add the file to `public/work/mydriverbook/` and update `video.src`.
