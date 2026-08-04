export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Playfair Display': { ital: [400, 500, 600, 700, 800, 900] },
      Inter: [400, 500, 600]
    },
    display: 'swap'
  },

  supabase: {
    // UI-only build for now: Supabase is wired up but not queried anywhere yet.
    // Set NUXT_PUBLIC_SUPABASE_URL / NUXT_PUBLIC_SUPABASE_ANON_KEY in .env when ready.
    redirect: false
  },

  app: {
    head: {
      title: 'LORE — Scents that take you somewhere.',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/images/lore_monogram.svg' }]
    }
  }
})
