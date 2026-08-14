export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL || process.env.BE_URL,
    key: process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.BE_KEY
  },

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Playfair Display': { ital: [400, 500, 600, 700, 800, 900] },
      Inter: [400, 500, 600]
    },
    display: 'swap'
  },


  app: {
    head: {
      title: 'LAMAR — Scents that take you somewhere.',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/images/lore_monogram.svg' }]
    }
  }
})
