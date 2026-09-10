# MARUF HASAN — Developer & Web3 Community Builder

Live: **https://marufix.xyz/** · Deployed via GitHub Pages (push to `main` = deploy)

A dual-identity portfolio for **Maruf Hasan**: developer shipping web tools
(JS, AI workflows, Supabase, Cloudflare Workers) and Web3 community builder
(170K+ members managed, 500+ tutorials, 5+ years in crypto).

## Concept — "dual-boot", no confusion

One shell, two modes. A header switcher (`</> dev` / `web3`) flips the accent
color, hero role line, terminal script and project filter — the visitor always
knows which mode they are in. About + Stack show both crafts side by side.

## Design system

- Sharp everything — `border-radius: 0` enforced globally, zero exceptions
- 2 fonts only: Space Grotesk (display) + JetBrains Mono (terminal)
- Dark terminal theme · dev = green `#3DDC84`, web3 = amber `#FFB020`
- No frameworks, no canvas pets, no preloaders — HTML + CSS + vanilla JS
- Subtle motion only (reveals, counters, typing terminal, ticker),
  fully disabled under `prefers-reduced-motion`

## Sections

1. Hero — typed terminal, stats, photo spec-sheet
2. About — developer card + web3 card
3. Stack — dev arsenal + web3 arsenal
4. Work — filterable: 4 dev builds, 4 web3 entries
5. Promo & Collab — X-focused services, process, DM CTAs
6. Journey — 2018 → 2026 timeline + education
7. Contact — direct channels only (no dead form backends)

## Files

```
index.html            Main page
404.html              Themed 404 (GitHub Pages picks it up automatically)
css/style.css         Whole design system
js/main.js            Mode, typer, reveals, counters, filters, menu
images/profile.webp   Portrait
favicon.svg           Terminal "M>_" mark
CNAME                 marufix.xyz (do not delete)
```

## Local preview

```sh
python -m http.server 8000
# open http://127.0.0.1:8000/
```

## QA checklist (run before push)

- [ ] DevTools console: 0 errors
- [ ] No horizontal overflow at 390px and 1440px
- [ ] Mode switch flips accent + filters projects
- [ ] No `border-radius` in computed styles
- [ ] All outbound links have no trailing spaces
