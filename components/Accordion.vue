<script setup lang="ts">
defineProps<{ title: string; variant?: 'dark' | 'light' }>()
const open = ref(false)
</script>

<template>
  <div class="border-b" :class="variant === 'light' ? 'border-cream/20' : 'border-line'">
    <button
      class="flex w-full items-center justify-between py-4 text-left text-sm tracking-wide uppercase"
      :class="variant === 'light' ? 'text-cream' : 'text-ink'"
      @click="open = !open"
    >
      {{ title }}
      <span class="text-lg leading-none">{{ open ? '\u2212' : '+' }}</span>
    </button>
    <div v-show="open" class="pb-4 text-sm leading-relaxed" :class="variant === 'light' ? 'text-cream/70' : 'text-ink/70'">
      <slot />
    </div>
  </div>
</template>
