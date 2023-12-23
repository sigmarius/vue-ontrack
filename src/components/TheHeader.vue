<script setup>
import TheLogo from "@/components/TheLogo.vue";
import TheHeaderProgress from "@/components/TheHeaderProgress.vue";

const emit = defineEmits(["goToTimeline", "goToProgress"]);
</script>

<template>
  <header
    class="sticky top-0 z-20 p-3 flex items-center justify-between border-b bg-white"
  >
    <TheLogo @click="emit('goToTimeline')" />

    <TheHeaderProgress @click="emit('goToProgress')" />
  </header>
</template>
