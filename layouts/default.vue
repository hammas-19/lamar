<template>
  <div class="flex min-h-screen flex-col">
    <HeroHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
