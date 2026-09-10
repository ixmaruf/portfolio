# MARUF HASAN — Developer & Web3 Community Builder

Live: **https://marufix.xyz/** · GitHub Pages (push to `main` = deploy)

## Concept — v4, two worlds

Light, matte, editorial single page with **two fully separate designs**.
The header switcher flips `data-mode` on `<html>` (set pre-paint, no flash):

- **dev** — warm paper + matte green terminal editorial. Zero web3 traces.
- **web3** — washi paper + sumi ink + vermilion Japanese aesthetic
  (hanko seal, seigaiha waves, brush strokes, ghost kanji). Zero terminal,
  zero dev traces.

Separation is CSS-driven (`html[data-mode="dev"] [data-for="web3"]{display:none}`
and vice versa). No project names, repos or code links anywhere (owner request).
Only completed historical facts are numbered — nothing needs live updating.

## Design details

- Sharp corners enforced globally; film-grain matte finish
- Dev: Space Grotesk + JetBrains Mono. Web3 adds Shippori Mincho + Zen Kaku Gothic New
- One accent per mode; editorial numbered rows (no card grids for services)
- Hanko seal stamps in on scroll; brush strokes draw via stroke-dashoffset
- Content visible without JS; `prefers-reduced-motion` respected

## Files

```
index.html            Dual content via data-for="dev|web3"
404.html              Themed 404
css/style.css         Both design systems
js/main.js            Mode, typer, reveals, stamp, brush, counters, form
images/profile.webp   Portrait
favicon.svg           Terminal mark
CNAME                 marufix.xyz (do not delete)
```

## Contact form

Web3Forms when a key is configured, else mail-app fallback (never fakes success):

1. https://web3forms.com → register `marufhasan8009@gmail.com` → verify
2. Paste key into `W3F_KEY` in `js/main.js`
3. Push

## QA checklist

- [ ] Console: 0 errors
- [ ] No overflow at 390px / 1440px, both modes (measure rects, not scrollWidth)
- [ ] Dev shows no web3 content and vice versa
- [ ] Sections keep 24px gutters on mobile (`.sec` must not reset side padding)
- [ ] No `border-radius` in computed styles
