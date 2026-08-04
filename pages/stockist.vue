<script setup lang="ts">
import pages from '~/data/pages.json'
const page = pages.stockist

const locations = [
  { city: 'Los Angeles, CA', name: 'Nordstrom — The Grove' },
  { city: 'New York, NY', name: 'Sephora — SoHo' },
  { city: 'San Francisco, CA', name: 'Nordstrom — Union Square' },
  { city: 'Miami, FL', name: 'Sephora — Lincoln Road' },
  { city: 'Chicago, IL', name: 'Nordstrom — Michigan Avenue' },
  { city: 'Austin, TX', name: 'Sephora — The Domain' }
]
</script>

<template>
  <div class="container-lore py-20">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h1 class="font-serif text-3xl md:text-5xl mb-6">{{ page.title }}</h1>
      <p class="text-ink/70 leading-relaxed">{{ page.description }}</p>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 max-w-3xl mx-auto">
      <div v-for="loc in locations" :key="loc.name" class="border-t border-line pt-4">
        <p class="text-sm font-medium">{{ loc.name }}</p>
        <p class="text-sm text-ink/50">{{ loc.city }}</p>
      </div>
    </div>
  </div>
</template>
