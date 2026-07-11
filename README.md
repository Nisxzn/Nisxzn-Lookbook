# Nithish Parameswaran — Portfolio

A scroll-driven personal portfolio built with Next.js, GSAP, and Three.js. Features parallax sections, scroll-scrubbed typography reveals, a WebGL hobby gallery, and project case studies.

---

## Tech Stack

| Layer | Tooling |
|:---|:---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript (strict) |
| Styling | Tailwind CSS v4 · inline design tokens |
| Animation | GSAP 3 + ScrollTrigger · Lenis smooth scroll |
| 3D / WebGL | Three.js · React Three Fiber · Drei |
| Tooling | ESLint 9 · Prettier · webpack build |

---

## Features

- **Scroll storytelling** — pinned sections + parallax wipes drive the narrative (GSAP ScrollTrigger synced to Lenis).
- **Scrub-reveal typography** — the opening quote brightens word-by-word as you scroll.
- **WebGL hobby gallery** — a Three.js camera dollies through a scattered image stack.
- **Projects** — LinkedIn AI, Fetchr RAG, and Luna AI with live GitHub links.
- **Fully responsive** — clean stacked layout on mobile/tablet (≤1024px), art-directed absolute layout on desktop.
- **Performance** — `next/image`, compressed assets, static prerendering.
- **Security headers** — CSP, HSTS, X-Frame-Options set in `next.config.ts`.
- **Accessible** — `prefers-reduced-motion` honored throughout, semantic landmarks, alt text.

---

## Project Structure

```
app/
  page.tsx          # home (single-page composition)
  layout.tsx        # metadata, fonts, OG/Twitter
lib/
  components/       # Hero, Story, Process, Projects, Certifications, Connect, …
  hooks/            # useParallax, useMediaQuery, useTypewriterScrub
  config/designTokens.ts  # colors, type, spacing, dimensions
public/             # images, certifications
next.config.ts      # security headers + CSP
```

---

## Run Locally

```bash
# Requires Node 18+ and npm
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
|:---|:---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript, no emit |

---

## Deploy (Vercel)

1. Import this repo in Vercel — it auto-detects Next.js.
2. Optional: set `NEXT_PUBLIC_SITE_URL` to your custom domain (drives Open Graph + canonical URLs).
3. Drop a `resume.pdf` into `public/` to activate the header **Resume** button.

---

## Projects

| Project | Stack |
|:---|:---|
| **LinkedIn AI** | Flask · LinkedIn API · MySQL · React |
| **Fetchr RAG** | RAG · Ollama · LangChain · React |
| **Luna AI** | Next.js · TypeScript · Ollama · RAG |

---

## Connect

- **GitHub:** [github.com/Nisxzn](https://github.com/Nisxzn)
- **LinkedIn:** [linkedin.com/in/nithishparameswaran](https://www.linkedin.com/in/nithishparameswaran/)
- **Instagram:** [instagram.com/nisxzn](https://www.instagram.com/nisxzn/)
- **Email:** nithishparameswaran2005@gmail.com
