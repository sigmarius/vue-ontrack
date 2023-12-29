<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";

import { routes, currentPage } from "@/router";
</script>

<template>
  <TheHeader />

  <main class="flex flex-col flex-grow">
    <!-- компонент кеширования, сохраняет динамическое состояние интегрированого динамического компонента -->
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>

  <TheNav />
</template>

<style scoped></style>
@/activities
