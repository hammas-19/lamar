<script setup lang="ts">
const { lines, subtotal, clearCart } = useCart()

const shippingCost = 0
const total = computed(() => subtotal.value + shippingCost)

const placingOrder = ref(false)
const orderPlaced = ref(false)
const confirmedOrderNumber = ref('')

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

async function placeOrder() {
  if (lines.value.length === 0) return

  placingOrder.value = true
  const orderNum = `LMR-${Math.floor(100000 + Math.random() * 900000)}`
  confirmedOrderNumber.value = orderNum

  try {
    const supabase = useSupabaseClient()
    
    // 1. Insert into orders table
    const { data: order, error: oErr } = await supabase
      .from('orders')
      .insert({
        order_number: orderNum,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        address: form.address,
        city: form.city,
        zip_code: form.zipCode,
        total_amount: total.value,
        status: 'pending'
      })
      .select()
      .single()

    if (!oErr && order) {
      // 2. Insert order items
      const itemsToInsert = lines.value.map((line) => ({
        order_id: order.id,
        product_title: line.title,
        variant_title: line.variant.title,
        sku: line.variant.sku,
        price: line.variant.price,
        quantity: line.quantity,
        image_url: line.image
      }))

      await supabase.from('order_items').insert(itemsToInsert)
    }
  } catch (err) {
    console.error('Error placing order in Supabase:', err)
  } finally {
    placingOrder.value = false
    orderPlaced.value = true
    clearCart()
  }
}
</script>

<template>
  <div class="container-lore py-16">
    <div v-if="orderPlaced" class="max-w-lg mx-auto text-center py-24">
      <p class="eyebrow mb-4">Thank you</p>
      <h1 class="font-serif text-3xl md:text-4xl mb-4">Your order is confirmed.</h1>
      <p class="text-sm font-mono text-ink/70 mb-2">Order #: {{ confirmedOrderNumber }}</p>
      <p class="text-ink/60 mb-8">
        We've received your order and are preparing it for shipment.
      </p>
      <NuxtLink to="/" class="btn-primary">Back to Home</NuxtLink>
    </div>

    <template v-else>
      <h1 class="font-serif text-3xl md:text-4xl mb-10">Checkout</h1>

      <div class="grid md:grid-cols-3 gap-12">
        <form class="md:col-span-2 space-y-10" @submit.prevent="placeOrder">
          <fieldset>
            <legend class="eyebrow mb-4">Contact</legend>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="Email address"
              class="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
            />
          </fieldset>

          <fieldset>
            <legend class="eyebrow mb-4">Shipping Address</legend>
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="form.firstName"
                type="text"
                required
                placeholder="First name"
                class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <input
                v-model="form.lastName"
                type="text"
                required
                placeholder="Last name"
                class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <input
                v-model="form.address"
                type="text"
                required
                placeholder="Address"
                class="col-span-2 border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <input
                v-model="form.city"
                type="text"
                required
                placeholder="City"
                class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <input
                v-model="form.zipCode"
                type="text"
                required
                placeholder="ZIP code"
                class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend class="eyebrow mb-4">Payment</legend>
            <div class="space-y-4">
              <input
                v-model="form.cardNumber"
                type="text"
                required
                placeholder="Card number"
                class="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <div class="grid grid-cols-2 gap-4">
                <input
                  v-model="form.expiry"
                  type="text"
                  required
                  placeholder="MM / YY"
                  class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
                />
                <input
                  v-model="form.cvc"
                  type="text"
                  required
                  placeholder="CVC"
                  class="border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" class="btn-primary w-full" :disabled="placingOrder || lines.length === 0">
            {{ placingOrder ? 'Placing Order...' : `Pay ${formatPrice(total)}` }}
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
                <p>{{ formatPrice(line.variant.price * line.quantity) }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-line pt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-ink/60">Subtotal</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ink/60">Shipping</span>
              <span>Free</span>
            </div>
            <div class="flex justify-between text-base font-medium pt-2">
              <span>Total</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
