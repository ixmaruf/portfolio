# MARUF HASAN — Developer & Web3 Community Builder

Live: **https://marufix.xyz/** · GitHub Pages (push to `main` = deploy)

## Concept — v3 "paper & ink"

Light, matte, editorial single-page site with **two fully separate modes**.
The header switcher flips `data-mode` on `<html>` (set pre-paint, no flash):

- `dev` — warm paper + matte green. Zero web3 traces.
- `web3` — cool paper + matte violet. Zero dev traces.

Separation is CSS-driven: `html[data-mode="dev"] [data-for="web3"] { display:none }`
and vice versa. No project names, repos or code links anywhere on the site
(by owner request). Numbers shown are completed historical facts only —
nothing that needs live updating.

## Design system

- Warm/cool paper backgrounds, ink text, hairlines, hard offset shadows
- Sharp corners enforced globally (`border-radius: 0 !important`)
- 2 fonts: Space Grotesk (display) + JetBrains Mono (labels)
- One accent per mode, film-grain overlay (SVG noise, matte finish)
- Editorial numbered rows instead of card grids
- Content visible without JS; JS only enhances (reveals own their start state)
- `prefers-reduced-motion` respected everywhere

## Files

```
index.html            Page (dual content via data-for="dev|web3")
404.html              Themed 404
css/style.css         Full design system + both themes
js/main.js            Mode, typer, reveals, counters, form, menu
images/profile.webp   Portrait
favicon.svg           Terminal mark
CNAME                 marufix.xyz (do not delete)
```

## Contact form

Posts to Web3Forms. Needs a free access key or it falls back to opening
the visitor's mail app (never fakes success):

1. https://web3forms.com → register `marufhasan8009@gmail.com` → verify
2. Paste the key into `W3F_KEY` in `js/main.js`
3. Push

## Local preview & QA

```sh
python -m http.server 8000
```

- [ ] Console: 0 errors
- [ ] No horizontal overflow at 390px / 1440px, both modes
- [ ] Dev mode shows no web3 content and vice versa (check via DOM)
- [ ] No `border-radius` in computed styles
- [ ] Form validation messages appear on bad input
