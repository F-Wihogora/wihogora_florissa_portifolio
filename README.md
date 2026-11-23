# Wihogora Florissa — Portfolio

A full, deploy-ready cinematic portfolio built with Next.js (App Router).
One continuous scrolling page: fixed nav → photo hero → about → skills →
projects → education/achievements → contact → footer.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

This is a stock Next.js 14 App Router project, so it deploys anywhere
Next.js does. Fastest path (free, ~2 minutes):

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, leave
   all settings default, click **Deploy**.
3. You'll get a live `.vercel.app` URL immediately — attach a custom
   domain later from the Vercel dashboard if you want one (e.g.
   `wihogoraflorissa.dev`).

Netlify, Cloudflare Pages, and Render all work the same way (they all
auto-detect `next build`).

## Before you send this to investors / employers

A few things are placeholders on purpose — swap them in before sharing
the live link:

- **Site address** — handled automatically on Vercel. If you later buy a
  custom domain, add an environment variable `NEXT_PUBLIC_SITE_URL`
  (e.g. `https://yourname.com`) in Vercel's project settings.
- **Link preview & favicon** — generated automatically
  (`app/opengraph-image.jsx`, `app/icon.jsx`). Nothing to add.
- **`components/Contact.jsx`** — double check the LinkedIn URL
  (`linkedin.com/in/wihogora-florissa`); your original notes had a space
  in it, so I normalized it to a valid slug — update it if your real
  handle differs.
- **Resume/CV** — there's no download-CV button yet since no file was
  provided. Easiest option: drop `resume.pdf` into `public/`, then add
  `<a href="/resume.pdf" download>Download CV</a>` next to the email CTA
  in `Contact.jsx` (or in the `Navbar`).
- **Project links** — `Projects.jsx` currently links out to your GitHub
  profile as a "see more" catch-all since individual repo URLs weren't
  provided. If each project has its own repo/live URL, add a `links:
  { repo, live }` field per project and render buttons on the card.
- **Recommendations** — `components/Recommendations.jsx` holds five real
  recommendations (`TESTIMONIALS`). To add one, append an object with
  `name`, `role` and `quote`; the monogram and marquee update themselves.
- **Project images** — `public/images/projects/church.png`,
  `finance.png` and `water.png` are website-interface previews I built
  (representative dashboards, with sample data), not screenshots of your
  real apps. Replace each file with a real screenshot (same filename, about
  1600x1000) and nothing else needs to change.

## File structure

```
app/
  layout.jsx            — fonts, SEO/OG metadata, theme color, theme-init script
  page.jsx               — composes every section in order
  globals.css            — design tokens (colors, spacing, radii), light/dark, reset
components/
  Navbar.jsx / .module.css        — fixed glass nav, mobile menu, theme toggle
  ThemeToggle.jsx / .module.css   — dark/light switch
  ScrollProgress.jsx / .module.css — top-of-page scroll progress bar
  SmoothScroll.jsx                — Lenis provider + scrollToTarget() helper
  KineticHeadline.jsx             — word-masked kinetic headline component
  Hero.jsx / .module.css          — fullscreen photo hero (public/images/hero.jpg)
  About.jsx / .module.css         — bio + quick-facts card
  Skills.jsx / .module.css        — categorized skills grid
  Projects.jsx / .module.css      — alternating vertical project gallery
  Recommendations.jsx / .module.css — testimonial marquee (real recommendations)
  Journey.jsx / .module.css       — education, achievements, currently learning
  Contact.jsx / .module.css       — CTA, email, social channels
  Footer.jsx / .module.css        — bottom bar
lib/
  useScrollReveal.js      — clip-path mask reveal (body copy, cards, pills)
  useMagnetic.js          — pointer-follow hover effect for CTAs
public/images/projects/   — project cover images (church, finance, water)
```

## Motion system

This is not template scroll-fade-in. The photo hero sets the tone; everything below it now
runs on a deliberate motion architecture rather than one-off effects:

- **Lenis smooth scroll** (`SmoothScroll.jsx`) replaces native scroll
  physics with eased, velocity-aware motion, driven by GSAP's ticker so
  every ScrollTrigger stays in sync. Disabled under
  `prefers-reduced-motion`. Nav links, the logo, and the hero's scroll
  indicator all route through it via `scrollToTarget()`.
- **Kinetic typography** (`KineticHeadline.jsx`) — every section
  headline (About, Skills, Projects, Recommendations, Journey, Contact)
  splits into words, each masked in its own `overflow:hidden` wrapper,
  sliding up from below the mask with a slight rotation, staggered
  left-to-right. This is the signature text treatment site-wide —
  distinct from the smaller reveal below.
- **Premium reveal** (`lib/useScrollReveal.js`) — used for body copy,
  cards, pills, and list items. Not opacity-fade: each element unclips
  from a bottom-to-top `clip-path` mask while settling from a slight
  offset and soft scale, once per element, GPU-cheap (`clip-path` +
  `transform` only).
- **Project gallery** (`Projects.jsx`) — an alternating left/right
  vertical gallery. Each project's cover image un-masks (`clip-path`)
  and scales into place, with the copy rising a beat behind, as the
  panel enters the viewport — each panel has its own self-contained
  ScrollTrigger (own trigger element, own start/end, fires once).
- **Cursor-reactive image parallax** — hovering a project's cover image
  shifts and scales it opposite to the pointer, independent of scroll
  (`Projects.jsx`, plain `mousemove`/`transform`, no library).
- **Infinite marquee** (`Recommendations.jsx`) — a GSAP `xPercent: -50,
  repeat: -1` loop over duplicated content for a seamless scroll,
  pausable on hover. Falls back to a static wrapped grid under reduced
  motion.
- **Magnetic elements** (`lib/useMagnetic.js`) — the nav CTA and the
  Contact email link follow the pointer while hovered and spring back
  on leave.
- **Scroll progress bar** (`ScrollProgress.jsx`) — thin glowing bar,
  rAF-throttled, tracks position through the whole page.
- **Theme crossfade** — dark/light toggle transitions `background`/
  `color` smoothly (see "Dark / light mode" below).

### A note on what changed after the first pass

The first version of this motion system had two more ambitious pieces:
a "stacked sticky sections" effect (About/Skills and Journey/Contact
each `position: sticky`, physically covering one another as you
scrolled) and a pinned, horizontal-scroll Projects gallery (vertical
scroll input converted to horizontal motion via GSAP's `pin` +
`containerAnimation`).

In practice, that combination broke: GSAP's pin inserts a spacer
element that changes document height *after* the sticky sections around
it had already been measured, which desynced their scroll math from
actual layout — the page would stall around Skills, then suddenly jump
straight to Contact, skipping Projects/Recommendations/Journey. That's
a real, reported bug, not a hypothetical — so both techniques were
removed and replaced with the versions described above: a normal
document-flow layout for every section, and a vertical (not pinned/
horizontal) Projects gallery. Each animation now has its own
self-contained trigger with no dependency on a neighboring section's
layout, which is what makes it robust rather than merely
impressive-looking. It's a deliberately more conservative motion system
than the first pass, in exchange for actually working.

### Scope decisions (read before assuming something's missing)

- **The hero is now a single optimised photo** (`public/images/hero.jpg`)
  instead of a video and WebGL layer, for fast loading. Replace that file
  to change the picture.
- **No WebGL/Three.js is used anywhere.** Depth is done with cheap
  `clip-path`/`transform` effects.

## Dark / light mode

A toggle lives in the navbar (desktop and mobile). It flips a
`data-theme="light"|"dark"` attribute on `<html>`, persists the choice to
`localStorage`, and defaults to the visitor's OS preference on first
visit. A small `beforeInteractive` script in `app/layout.jsx` applies the
stored/preferred theme before the page paints, so there's no flash of
the wrong theme. All section colors are CSS variables in `globals.css`,
so theming is centralized there — the hero photo has a light-theme overlay
so the text stays readable in both modes.

## Design system

All colors, spacing, and radii are defined once as CSS custom properties
in `app/globals.css` (`:root { --accent, --bg, --surface, ... }`) and
reused across every section's CSS module — change the palette in one
place to re-theme the whole site. Typography: **Syne** (bold display
headlines), **Manrope** (body text), **JetBrains Mono** (uppercase
eyebrows/labels — a nod to your embedded-systems background).

## How the scroll animation works

See "Motion system" above for the full breakdown. In short: headlines
use `KineticHeadline` (word-masked kinetic type), everything else uses
`useScrollReveal` (clip-path mask reveal), Projects uses its own
per-panel triggers (masked image reveal + parallax), and Recommendations
runs an independent infinite marquee tween. Every section is normal
document flow — nothing pins, sticks, or depends on a neighboring
section's layout (see "A note on what changed after the first pass"
above for why).

## Content coverage

Every section of the resume/bio you provided is represented:

- Hero — name, role, tagline, subtitle
- About — bio, quick facts (location, focus, availability)
- Skills — Languages, Frontend & Mobile, Backend, Databases, Embedded Systems, Tools
- Projects — Church Management System, Personal Finance & Savings App,
  Smart Water Monitoring System (features + tech stack for each; the
  RFID Attendance System card was removed per your request)
- Recommendations — new section, structure + motion are real, quote
  five real recommendations in a marquee
- Journey — Rwanda Coding Academy + coursework, achievements list,
  currently-learning tags
- Contact — career objective framing, email, GitHub, LinkedIn, location

## Multi-page instead of single-page?

This ships as one scrolling page with anchor navigation (`#about`,
`#projects`, etc.), which is the standard structure for a portfolio like
this and keeps the cinematic hero as one unbroken narrative. If you'd
rather have true separate routes (`/about`, `/projects`, `/contact`),
each section component can be dropped into its own `app/<route>/page.jsx`
almost as-is — say the word and I'll split it that way instead.

## Performance & accessibility notes

- All interactive elements are real `<button>`/`<a>` tags with visible
  focus states (`:focus-visible` styled in `globals.css`).
- Nav locks body scroll while the mobile menu is open.
