# MARUF HASAN — Web3 Community Manager Portfolio

## Project Overview
- **Name**: Maruf Hasan Portfolio
- **Goal**: Professional portfolio website for a Web3 Community Manager
- **Style**: Japanese editorial / newspaper typography with sakura animations
- **Colors**: Red (#C41E3A), Black (#1A1A1A), Light Cream (#F5F0E8)

## Features
- Japanese-inspired editorial layout with bold typography
- Sakura petal canvas animations (lightweight, works on low-end devices)
- Scroll-reveal animations on all sections
- Real visitor counter using D1 database (Today + Total)
- Profile photo with B&W to color toggle on click
- Custom cursor, scroll progress bar
- Loading screen with reveal animation
- Fully responsive (mobile, tablet, desktop)
- Contact form with API backend

## Sections
1. **Hero** — Name, title, stats, profile photo
2. **About** — Background, goals, work style
3. **Skills** — Telegram, Content, Twitter/X, Discord, Growth, Design
4. **Experience** — Timeline from 2018 to 2025
5. **Education** — BBA in Management (3rd year)
6. **Contact** — Full contact form with budget selector
7. **Connect** — Social links (Twitter, Telegram, Email, Discord)
8. **Footer** — Brand + copyright
9. **Visitor Counter** — Real-time Today + Total visit counter

## URLs
- **Local Dev**: http://localhost:3000
- **Production**: (Deploy to Cloudflare Pages when ready)

## API Endpoints
- `POST /api/visit` — Increment and get visitor count
- `GET /api/visits` — Get current visitor count
- `POST /api/contact` — Submit contact form

## Tech Stack
- **Backend**: Hono (TypeScript) on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite) for visitor counter
- **Frontend**: Vanilla HTML/CSS/JS with Canvas API
- **Fonts**: Montserrat, Poppins, Plus Jakarta Sans, Inter, Noto Sans JP
- **Icons**: Font Awesome 6
- **Build**: Vite + Wrangler

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Local dev ready, awaiting Cloudflare API key for production deploy
- **Last Updated**: 2026-02-13
