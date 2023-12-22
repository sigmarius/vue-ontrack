<script setup>
    import TheLogo from '@/components/TheLogo.vue';
    import TheHeaderProgress from '@/components/TheHeaderProgress.vue';
</script>

<template>
  <header class="sticky top-0 z-20 p-3 flex items-center justify-between border-b bg-white">
    <TheLogo />

    <TheHeaderProgress />
  </header>
</template>
