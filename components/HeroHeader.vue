<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
const isPastHero = ref(false)
const menuOpen = ref(false)
let rafId: number | null = null

const handleScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    if (isHome.value) {
      const threshold = window.innerHeight * 0.92
      isPastHero.value = window.scrollY > threshold
    } else {
      isPastHero.value = true
    }
    rafId = null
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
})

const heroNav = [
  { label: 'Fragrances', to: '/collections/fragrances' },
  { label: 'Shop All', to: '/collections/all' },
  { label: 'About', to: '/about' },
  { label: 'Stockists', to: '/stockist' },
  { label: 'Bag', to: '/cart' }
]
</script>

<template>
  <div>
    <!-- Top-left navigation -->
    <div class="fixed top-6 md:top-8 left-6 md:left-10 z-50">
      <!-- Desktop pill nav -->
      <nav
        class="hidden md:flex flex-wrap items-center gap-3 transition-all duration-300"
        :class="isPastHero ? 'bg-black/80 rounded-full p-2 backdrop-blur-sm' : ''"
      >
        <NuxtLink
          v-for="item in heroNav"
          :key="item.to"
          :to="item.to"
          class="px-3 md:px-5 py-1.5 md:py-2.5 border border-cream/40 rounded-full text-cream text-[10px] md:text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:bg-cream hover:text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden p-2 -ml-2 transition-colors duration-300"
        :class="isPastHero ? 'text-ink' : 'text-cream'"
        aria-label="Open menu"
        @click="menuOpen = true"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Logo fixed top-right -->
    <NuxtLink to="/" class="fixed top-6 md:top-8 right-6 md:right-10 z-50 transition-all duration-300">
      <img :src="isPastHero ? '/logoBlk.png' : '/logoWht.png'" alt="LORE" class="h-8 md:h-10 w-auto" />
    </NuxtLink>

    <!-- Mobile menu overlay -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-[60] bg-ink/95 flex flex-col items-center justify-center gap-8 md:hidden"
      @click.self="menuOpen = false"
    >
      <button
        class="absolute top-6 right-6 text-cream p-2"
        aria-label="Close menu"
        @click="menuOpen = false"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <NuxtLink
        v-for="item in heroNav"
        :key="item.to"
        :to="item.to"
        class="text-cream text-3xl font-serif italic"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
