<script setup>
import { PAGE_TIMELINE, PAGE_PROGRESS } from "@/constants";

import TheLogo from "@/components/TheLogo.vue";
import TheHeaderProgress from "@/components/TheHeaderProgress.vue";

import { isPageValid } from "@/validators";

const emit = defineEmits({
  navigate: isPageValid,
});
</script>

<template>
  <header
    class="sticky top-0 z-20 p-3 flex items-center justify-between border-b bg-white"
  >
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />

    <TheHeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>
