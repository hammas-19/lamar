<script setup lang="ts">
const menuOpen = ref(false)

const heroNav = [
  { label: 'Men', to: '/collections/men' },
  { label: 'Women', to: '/collections/women' },
  { label: 'Unisex', to: '/collections/unisex' },
  { label: 'About', to: '/about' },
  { label: 'Bag', to: '/cart' }
]
</script>

<template>
  <div>
    <!-- Top-left navigation -->
    <div class="fixed top-4 md:top-6 left-4 md:left-6 z-50">
      <!-- Desktop pill nav -->
      <nav class="hidden md:flex items-center gap-1.5 bg-black/80 backdrop-blur-sm rounded-full p-1 md:p-1.5 border border-cream/10">
        <NuxtLink
          v-for="item in heroNav"
          :key="item.to"
          :to="item.to"
          class="px-2.5 md:px-3.5 py-1 md:py-1.5 border border-cream/40 rounded-full text-cream text-[10px] md:text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:bg-cream hover:text-ink"
          active-class="bg-cream !text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden p-2 bg-black/80 backdrop-blur-sm rounded-full text-cream border border-cream/10 transition-colors duration-300 flex items-center justify-center"
        aria-label="Open menu"
        @click="menuOpen = true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Logo fixed top-right -->
    <NuxtLink
      to="/"
      class="fixed top-4 md:top-6 right-4 md:right-6 z-50 bg-black/80 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center justify-center border border-cream/10"
    >
      <img src="/logoWht.png" alt="LAMAR" class="h-5 md:h-6 w-auto" />
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
