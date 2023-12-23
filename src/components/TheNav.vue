<script setup>
import {
  ClockIcon,
  ListBulletIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/outline";
import NavItem from "./NavItem.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";

// обозначаем пропсы, полученные от родителя
// в html передаются в кебаб-кейс
// в js обозначаются в кемел-кейс
defineProps(["currentPage"]);

// пропсы напрямую в дочернем компоненте менять нельзя!!!
// сообщаем родителю об изменении пропса
// определяем событие navigate
const emit = defineEmits(["navigate"]);

const navItems = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon,
};
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex justify-around items-center border-t">
      <NavItem
        v-for="(icon, page) in navItems"
        :key="page"
        :href="`#${page}`"
        :class="{
          'bg-gray-200 pointer-events-none': page === currentPage,
        }"
        @click="emit('navigate', page)"
      >
        <component :is="icon" class="h-6 w-6" />
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>
