<script setup>
  import { CheckCircleIcon } from '@heroicons/vue/24/solid';
  import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

  const navItems = [
    'timeline', 'activities', 'progress'
  ];
</script>

<template>
  <header class="sticky top-0 z-20  p-3 flex items-center justify-between border-b bg-white">
    <a href="#">
      <img src="./assets/logo.png" alt="Logo" class="h-9" />
    </a>

    <a href="#" class="text-sm">
      <div v-if="true" class="flex items-center gap-1">
        Day complete!

        <CheckCircleIcon class="h-7 text-green-500" />
      </div>

      <div v-else class="flex items-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>

        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
  </header>

  <main class="flex flex-col flex-grow">

  </main>

  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex justify-around items-center border-t">
      <li
        class="flex-1"
        v-for="page in navItems"
        :key="page"
        >
        <a
          class="p-2 flex flex-col items-center text-xs capitalize"
          :href="`#${page}`"
          >

          <ClockIcon class="h-6 w-6" v-if="page === 'timeline'" />
          <ListBulletIcon class="h-6 w-6" v-else-if="page === 'activities'" />
          <ChartBarIcon class="h-6 w-6" v-else />

          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
