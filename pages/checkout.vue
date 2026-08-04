<script setup lang="ts">
const { lines, subtotal } = useCart()

const shippingCost = 0
const total = computed(() => subtotal.value + shippingCost)

// UI-only checkout shell — no real payment/order processing wired up yet.
const placingOrder = ref(false)
const orderPlaced = ref(false)

function placeOrder() {
  placingOrder.value = true
  setTimeout(() => {
    placingOrder.value = false
    orderPlaced.value = true
  }, 900)
}
</script>

<template>
  <div class="container-lore py-16">
    <div v-if="orderPlaced" class="max-w-lg mx-auto text-center py-24">
      <p class="eyebrow mb-4">Thank you</p>
      <h1 class="font-serif text-3xl md:text-4xl mb-4">Your order is confirmed.</h1>
      <p class="text-ink/60 mb-8">
        This is a UI preview — no real order has been placed or charged.
      </p>
      <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
    </div>

    <template v-else>
      <h1 class="font-serif text-3xl md:text-4xl mb-10">Checkout</h1>

      <div class="grid md:grid-cols-3 gap-12">
        <form class="md:col-span-2 space-y-10" @submit.prevent="placeOrder">
          <fieldset>
            <legend class="eyebrow mb-4">Contact</legend>
            <input type="email" required placeholder="Email address" class="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
          </fieldset>

          <fieldset>
            <legend class="eyebrow mb-4">Shipping Address</legend>
            <div class="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="First name" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input type="text" required placeholder="Last name" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input type="text" required placeholder="Address" class="col-span-2 border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input type="text" required placeholder="City" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <input type="text" required placeholder="ZIP code" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
            </div>
          </fieldset>

          <fieldset>
            <legend class="eyebrow mb-4">Payment</legend>
            <div class="space-y-4">
              <input type="text" required placeholder="Card number" class="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              <div class="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="MM / YY" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
                <input type="text" required placeholder="CVC" class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink" />
              </div>
            </div>
          </fieldset>

          <button type="submit" class="btn-primary w-full" :disabled="placingOrder || lines.length === 0">
            {{ placingOrder ? 'Placing Order...' : `Pay $${total.toFixed(2)}` }}
          </button>
        </form>

        <div class="border border-line p-6 h-fit">
          <h2 class="font-serif text-xl mb-6">Order Summary</h2>

          <div v-if="lines.length === 0" class="text-sm text-ink/50">Your bag is empty.</div>
          <div v-else class="space-y-4 mb-6">
            <div v-for="line in lines" :key="line.key" class="flex gap-3">
              <div class="w-14 h-16 bg-line/30 shrink-0 overflow-hidden">
                <img :src="line.image" :alt="line.title" class="h-full w-full object-cover" />
              </div>
              <div class="flex-1 flex items-start justify-between text-sm">
                <div>
                  <p>{{ line.title }}</p>
                  <p class="text-ink/50">{{ line.variant.title }} &times; {{ line.quantity }}</p>
                </div>
                <p>${{ (line.variant.price * line.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-line pt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-ink/60">Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ink/60">Shipping</span>
              <span>Free</span>
            </div>
            <div class="flex justify-between text-base font-medium pt-2">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
