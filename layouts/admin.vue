<template>
  <div class="min-h-screen bg-[#0f0f14] text-slate-100 flex font-sans antialiased">
    <AdminSidebar />
    <main class="flex-1 min-w-0 overflow-y-auto max-h-screen">
      <div class="max-w-7xl mx-auto p-6 md:p-10">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
</script>
