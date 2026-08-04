<script setup lang="ts">
const route = useRoute()
const handle = computed(() => route.params.handle as string)
const product = computed(() => useProduct(handle.value))
const products = useProducts()

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const selectedVariant = ref(product.value.variants[0])
const quantity = ref(1)
const { addItem } = useCart()
const added = ref(false)

function handleAddToCart() {
  if (!product.value) return
  addItem(product.value, selectedVariant.value, quantity.value)
  added.value = true
  setTimeout(() => (added.value = false), 2000)
}

const related = computed(() =>
  products.filter((p) => p.category === product.value?.category && p.handle !== handle.value).slice(0, 4)
)
</script>

<template>
  <div v-if="product">
    <div class="relative min-h-screen" :style="{ background: product.gradient }">
      <div class="relative z-10 grid md:grid-cols-3">
        <!-- Left: Fragrance Notes (desktop) -->
        <aside
          v-if="product.notes?.length"
          class="hidden md:flex md:flex-col md:items-center md:justify-center md:sticky md:top-0 md:h-screen px-6 py-12 text-ink"
        >
          <p class="text-[11px] uppercase tracking-[0.2em] mb-8 opacity-70">Fragrance Notes</p>
          <ul class="space-y-3 text-center">
            <li v-for="note in product.notes" :key="note" class="font-serif italic text-2xl md:text-3xl">
              {{ note }}
            </li>
          </ul>
        </aside>
        <aside v-else class="hidden md:block" />

        <!-- Center: Image + Description -->
        <main class="py-12 md:py-24 px-6">
          <!-- Mobile product info -->
          <div class="md:hidden mb-10 text-ink text-center">
            <p class="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-70">LORE</p>
            <h1 class="font-serif text-3xl italic mb-2">{{ product.title }}</h1>
            <p class="text-xl mb-6">${{ selectedVariant.price.toFixed(2) }}</p>

            <div v-if="product.variants.length > 1" class="flex justify-center gap-2 mb-6">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                class="px-4 py-2 text-xs uppercase tracking-widest border border-ink/40 rounded-full transition-colors"
                :class="selectedVariant.id === variant.id ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/10'"
                @click="selectedVariant = variant"
              >
                {{ variant.title }}
              </button>
            </div>

            <div class="flex items-center justify-center gap-4 mb-6">
              <button class="w-10 h-10 border border-ink/40 rounded-full" @click="quantity = Math.max(1, quantity - 1)">-</button>
              <span class="w-8">{{ quantity }}</span>
              <button class="w-10 h-10 border border-ink/40 rounded-full" @click="quantity++">+</button>
            </div>

            <button
              class="inline-flex items-center justify-center bg-ink text-cream px-10 py-3.5 text-[13px] tracking-[0.12em] uppercase rounded-full transition-colors duration-200 hover:bg-black"
              @click="handleAddToCart"
            >
              {{ added ? 'Added to Bag' : 'Add to Bag' }}
            </button>
          </div>

          <!-- Product image -->
          <div class="aspect-square flex items-center justify-center">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-contain drop-shadow-2xl" />
          </div>

          <!-- Description -->
          <div class="mt-16 text-center max-w-lg mx-auto text-ink">
            <p class="text-[11px] uppercase tracking-[0.2em] mb-4 opacity-70">Description</p>
            <p class="text-sm md:text-base leading-relaxed opacity-90">{{ product.description }}</p>
          </div>

          <!-- Accordions -->
          <div class="mt-12 max-w-lg mx-auto">
            <Accordion title="Ingredients">
              <p>A full ingredients list is available on the product packaging.</p>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p>
                We offer complimentary ground shipping on all orders. Returns accepted within
                30 days of receipt.
              </p>
            </Accordion>
            <Accordion title="SKU">
              <p>{{ selectedVariant.sku }}</p>
            </Accordion>
          </div>
        </main>

        <!-- Right: Product info (desktop) -->
        <aside class="hidden md:flex md:flex-col md:items-center md:justify-center md:sticky md:top-0 md:h-screen px-6 py-12 text-ink">
          <p class="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-70">LORE</p>
          <h1 class="font-serif text-4xl italic mb-1 text-center">{{ product.title }}</h1>
          <p class="text-[10px] uppercase tracking-[0.2em] mb-8 opacity-70">{{ product.category }}</p>
          <p class="text-xl mb-8">${{ selectedVariant.price.toFixed(2) }}</p>

          <div v-if="product.variants.length > 1" class="mb-8 w-full max-w-[240px]">
            <p class="text-[10px] uppercase tracking-[0.2em] mb-3 text-center opacity-70">Size</p>
            <div class="flex gap-2 justify-center">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                class="flex-1 px-4 py-2.5 text-xs uppercase tracking-widest border border-ink/40 rounded-full transition-colors"
                :class="selectedVariant.id === variant.id ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/10'"
                @click="selectedVariant = variant"
              >
                {{ variant.title }}
              </button>
            </div>
          </div>

          <div class="flex items-center gap-4 mb-6">
            <button class="w-10 h-10 border border-ink/40 rounded-full" @click="quantity = Math.max(1, quantity - 1)">-</button>
            <span class="w-8 text-center">{{ quantity }}</span>
            <button class="w-10 h-10 border border-ink/40 rounded-full" @click="quantity++">+</button>
          </div>

          <button
            class="inline-flex items-center justify-center bg-ink text-cream px-10 py-3.5 text-[13px] tracking-[0.12em] uppercase rounded-full transition-colors duration-200 hover:bg-black"
            @click="handleAddToCart"
          >
            {{ added ? 'Added to Bag' : 'Add to Bag' }}
          </button>
        </aside>
      </div>

      <!-- Mobile fragrance notes -->
      <section v-if="product.notes?.length" class="md:hidden relative z-10 px-6 py-12 text-ink text-center">
        <p class="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-70">Fragrance Notes</p>
        <ul class="space-y-2">
          <li v-for="note in product.notes" :key="note" class="font-serif italic text-2xl">
            {{ note }}
          </li>
        </ul>
      </section>
    </div>

    <section v-if="related.length" class="py-24 bg-cream">
      <div class="container-lore mb-8">
        <h2 class="font-serif text-2xl md:text-3xl">You May Also Like</h2>
      </div>
      <div class="px-3 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <ProductCard v-for="p in related" :key="p.handle" :product="p" />
        </div>
      </div>
    </section>
  </div>
</template>
