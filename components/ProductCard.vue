<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const props = defineProps<{ product: Product }>()

const minPrice = computed(() =>
  Math.min(...props.product.variants.map((v) => v.price))
)
</script>

<template>
  <NuxtLink :to="`/products/${product.handle}`" class="group relative block">
    <div class="relative aspect-square overflow-hidden bg-[#f7f5f1] transition-colors duration-500">
      <div
        v-if="product.gradient"
        class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        :style="{ background: product.gradient }"
      />
      <img
        :src="product.image"
        :alt="product.title"
        class="absolute inset-0 h-full w-full object-contain p-6 md:p-10 transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between">
      <div>
        <h3 class="font-serif text-lg italic leading-tight">{{ product.title }}</h3>
        <p class="text-[11px] uppercase tracking-[0.15em] text-ink/60 mt-1">
          {{ product.category }}
        </p>
      </div>
      <div class="text-right">
        <p class="text-[11px] uppercase tracking-[0.15em] text-ink/60">
          {{ product.variants[0].title }}
        </p>
        <p class="text-sm">${{ minPrice.toFixed(0) }}</p>
      </div>
    </div>

    <span
      v-if="product.badge"
      class="absolute top-4 left-4 px-2.5 py-1 bg-ink text-cream text-[10px] uppercase tracking-[0.12em]"
    >
      {{ product.badge }}
    </span>
  </NuxtLink>
</template>
