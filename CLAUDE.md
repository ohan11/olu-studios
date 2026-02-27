# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Olu Studios is an artist portfolio and e-commerce website built with **Astro 4** (static output) and integrated with **Shopify Buy Button SDK** for checkout. Deployed to GitHub Pages via GitHub Actions.

## Commands

- `npm run dev` — Start dev server (base path `/`)
- `npm run build` — Production build (base path `/olu-studios` when `GITHUB_ACTIONS` is set)
- `npm run preview` — Preview production build locally

## Architecture

### Shopify Integration (two approaches coexist)

1. **Buy Button SDK (primary, client-side)**: `ShopifyCollection.astro` loads the Shopify Buy Button SDK script at runtime and renders collection widgets directly. Each shop page passes a collection ID from env vars. The SDK handles product display, modals, cart, and checkout entirely on the client.

2. **Storefront GraphQL API (secondary)**: `src/lib/shopify.ts` provides server-side GraphQL helpers (`getProducts`, `getCollection`) using the Storefront API. These are available but the shop pages currently use the Buy Button SDK approach instead.

### Key Patterns

- **Shop pages** (`src/pages/shop/*.astro`) each reference a specific Shopify collection ID from environment variables (e.g., `SHOPIFY_ORIGINALS_COLLECTION_ID`). Custom styling options are passed per-page to `ShopifyCollection`.
- **Content is JSON-driven**: Home page content (`src/data/home.json`), announcements (`src/data/announcements.json`), portfolio items (`src/data/portfolio/items.json`), and collections (`src/data/collections.json`) are all static JSON files.
- **Layout**: Single layout (`src/layouts/Layout.astro`) wraps all pages with Announcement banner, Header, and Footer.
- **Portfolio/Work page**: Uses `src/lib/portfolio.ts` to load items from JSON, displayed as a gallery (not for sale).
- **Base URL handling**: `astro.config.mjs` sets `base: '/'` in dev but `/olu-studios` in CI builds. Pages use `import.meta.env.BASE_URL` to prefix asset paths.

### Environment Variables

Required in `.env` (and as GitHub Actions secrets for deployment):
- `SHOPIFY_STORE_DOMAIN` — e.g., `your-store.myshopify.com`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_HOME_COLLECTION_ID`, `SHOPIFY_ALL_COLLECTION_ID`, `SHOPIFY_ORIGINALS_COLLECTION_ID`, `SHOPIFY_PRINTS_COLLECTION_ID`, `SHOPIFY_AIRLINES_COLLECTION_ID`

### CSS

Global styles and CSS custom properties are in `src/styles/global.css`. Brand color is `--hot-pink: #FF3160`. Pages use scoped `<style>` blocks. The home page has a unique pink/coral theme (`#ed9494`) for its Shopify buttons.

### Static Assets

- Images go in `public/images/` and `public/portfolio/`
- Referenced with absolute paths from JSON data files (e.g., `/portfolio/image.jpg`)
