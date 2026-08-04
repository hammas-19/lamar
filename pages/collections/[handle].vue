<script setup lang="ts">
const route = useRoute()
const products = useProducts()

const collections: Record<string, { title: string; category?: 'fragrance' | 'object' | 'set' }> = {
  all: { title: 'Shop All' },
  fragrances: { title: 'Fragrances', category: 'fragrance' }
}

const handle = computed(() => route.params.handle as string)
const collection = computed(() => collections[handle.value] ?? { title: 'Shop' })

const filtered = computed(() => {
  if (!collection.value.category) return products
  return products.filter((p) => p.category === collection.value.category)
})

const sort = ref('featured')
const sorted = computed(() => {
  const list = [...filtered.value]
  if (sort.value === 'price-asc') {
    list.sort((a, b) => a.variants[0].price - b.variants[0].price)
  } else if (sort.value === 'price-desc') {
    list.sort((a, b) => b.variants[0].price - a.variants[0].price)
  }
  return list
})
</script>

<template>
  <div class="py-16">
    <div class="container-lore">
      <div class="text-center mb-12">
        <p class="eyebrow mb-3">Collection</p>
        <h1 class="font-serif text-3xl md:text-5xl">{{ collection.title }}</h1>
      </div>

      <div class="flex items-center justify-between mb-8">
        <p class="text-sm text-ink/60">{{ sorted.length }} products</p>
        <select
          v-model="sort"
          class="border border-line bg-transparent px-3 py-2 text-sm focus:outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>

    <div class="px-3 md:px-6">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <ProductCard v-for="p in sorted" :key="p.handle" :product="p" />
      </div>
    </div>
  </div>
</template>
