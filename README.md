# LORE — UI Revamp

A from-scratch **Nuxt 3** rebuild of the LORE fragrance storefront UI (home, collections,
product detail, cart, checkout, and supporting pages). Product copy, imagery and prices
were extracted from the client's live site for an authentic look.

**This is a UI-only build.** There is no backend wired up yet:
- The product catalog lives in static JSON (`data/products.json`, `data/pages.json`).
- The cart (`composables/useCart.ts`) is an in-memory, client-only demo — it resets on
  page refresh and isn't persisted anywhere.
- Checkout is a static form shell; submitting it does not charge a card or place a real order.
- `@nuxtjs/supabase` is installed and configured (see `.env.example`) so real data/auth
  can be wired in later, but nothing currently queries it.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

- `pages/` — routes: home, `collections/[handle]`, `products/[handle]`, cart, checkout,
  about, faq, and policy pages.
- `components/` — `AppHeader`, `AppFooter`, `ProductCard`, `Accordion`, `Newsletter`.
- `composables/` — `useProducts` (catalog access), `useCart` (in-memory cart state).
- `data/` — extracted product & page content (`products.json`, `pages.json`).
- `public/images/` — extracted product/brand imagery.

## Next steps (not yet implemented)

- Wire `@nuxtjs/supabase` to real product/order tables.
- Persist cart (Supabase or local storage) and connect checkout to a real payment
  processor.
- Search, discount codes, and account pages.
# lamar
