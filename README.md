# PromptVault

PromptVault is a local-first prompt manager built as a modern SaaS-style web application. It lets you save, organize, tag, search and reuse your best AI prompts from a clean, fast dashboard — with no backend, no account, and no server required.

## Overview

Good prompts are worth keeping. They are the difference between a generic AI answer and a great one, yet most of them end up scattered across notes, chats and text files.

PromptVault exists to fix that. It is a personal prompt library that runs entirely in your browser: create prompts, organize them into categories, tag them, mark favorites, and search across everything instantly. Your library persists between visits through browser localStorage, and a one-click JSON export gives you a portable backup you own.

It is designed to feel like a polished SaaS product while remaining a lightweight, privacy-friendly client-side app — suitable as a portfolio piece, a personal tool, or a starting point for a larger product.

## Features

- **Prompt CRUD** — create, view, edit and delete prompts in a polished dialog and form
- **Categories** — Development, Marketing, Writing, AI, Design, Business
- **Search** — instant, live filtering across title, description, content and tags
- **Favorites** — star the prompts you reach for most and filter to just those
- **JSON import/export** — download your whole library as a backup file and restore it later
- **Dark mode** — rich dark theme with pre-paint restore, persisted in localStorage
- **Responsive design** — clean layouts on mobile, tablet, laptop and desktop
- **localStorage persistence** — your library survives reloads without any database
- **SaaS-style dashboard** — card grid, category chips, result counts and empty states

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Framer Motion** — dialogs, cards and entrance animations
- **Lucide React** — iconography
- **localStorage** — JSON storage, no backend

## Project Structure

```
pv_work/
├── app/
│   ├── globals.css        # Tailwind v4 import, dark variant, theme tokens
│   ├── layout.tsx         # Root layout with pre-paint dark mode script
│   └── page.tsx           # Renders the PromptVault app
├── src/
│   └── components/
│       ├── app/
│       │   ├── Footer.tsx         # Brand, links, backup actions, copyright
│       │   ├── PromptCard.tsx     # Premium prompt card
│       │   ├── PromptForm.tsx     # Create/Edit form with tag chips
│       │   └── PromptVaultApp.tsx # App shell: nav, hero, dashboard, dialogs
│       └── ui/
│           └── Dialog.tsx         # Reusable animated dialog
├── public/
│   └── favicon.svg
├── next.config.js         # devIndicators: false, poweredByHeader: false
├── postcss.config.js      # Tailwind v4 PostCSS plugin
└── package.json
```

## Installation

**From git:**

```bash
git clone <your-repo-url>
cd pv_work
npm install
npm run dev
```

**From a downloaded ZIP:** extract it, then from the extracted `pv_work` folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or the port shown in your terminal).

## Development

`npm run dev` starts Next.js in development mode with hot reload — edit any file under `app/` or `src/` and the browser updates instantly.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build locally |

## Build

```bash
npm run build
npm start
```

The production build outputs a fully static page that is served by Next.js. Because there is no server-side logic, the app also deploys cleanly to static hosts (Vercel, Netlify) with no extra configuration.

## Data Storage

PromptVault uses **browser localStorage** and does not require a database.

- All prompts and your theme preference are stored as JSON in your browser under the keys `promptvault_prompts` and `promptvault_dark`.
- Data stays in the browser that created it — nothing is uploaded anywhere.
- Clearing your browser storage (or using the app in another browser) removes local data.
- Use **Export JSON** regularly to keep a backup; the export file is a plain JSON array of your prompts that you fully own.

## Import / Export

- **Export** writes `promptvault-backup.json` containing every prompt with its title, description, content, category, tags, favorite status and creation date.
- **Import** reads such a JSON file and replaces the current library with its contents, after validating that it is an array.
- Keep your export file somewhere safe (cloud drive, repo) — it is your portable library.

## Dark Mode

The dark toggle stores your preference in localStorage (`promptvault_dark`). A tiny inline script in the root layout re-applies the `dark` class to `<html>` **before first paint**, so the page never flashes light when you reload in dark mode. All components ship matching light and dark styles — the dark theme uses deep, slightly blue-tinted surfaces rather than a simple color inversion.

## Responsive Design

The layout adapts across four breakpoints:

- **Desktop (1440px)** — centered 1152px container, 3-column dashboard grid with a sticky sidebar
- **Laptop (1024px)** — same grid, compacted spacing
- **Tablet (768px)** — cards move to two columns, full-width inputs
- **Mobile (375px)** — single-column stacked cards, hamburger navigation, full-width buttons

No horizontal scrolling at any size; touch targets remain at least 36px.

## Privacy

PromptVault is private by design. Your prompts never leave your browser: there is no analytics, no telemetry, no network requests with your data, and no server-side storage of any kind. Everything you type stays in localStorage on your device until you export it yourself.

## Limitations

PromptVault is intentionally scoped as a client-side app. It currently has:

- no cloud sync between devices
- no user authentication or accounts
- no server-side database
- no collaborative or multi-user features

## Future Improvements

These are ideas only — none are implemented:

- cloud sync across devices
- user authentication
- workspace sharing
- prompt version history
- AI-powered prompt suggestions
- team collaboration

## Developer

Developed by Chit Ko Ko

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify and distribute this project for personal or educational purposes with attribution. This is a personal portfolio/student project provided as-is, without warranty of any kind.
