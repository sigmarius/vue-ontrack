<script setup>
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const navItems = {
  timeline: ClockIcon,
  activities: ListBulletIcon,
  progress: ChartBarIcon
}
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex justify-around items-center border-t">
      <li class="flex-1" v-for="(icon, page) in navItems" :key="page">
        <a class="p-2 flex flex-col items-center text-xs capitalize" :href="`#${page}`">
          <component :is="icon" class="h-6 w-6" />
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>
