<script setup>
import NavItem from "@/components/NavItem.vue";

import { NAV_ITEMS } from "@/constants";

import { currentPage, navigate } from "@/router";
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex justify-around items-center border-t">
      <NavItem
        v-for="(icon, page) in NAV_ITEMS"
        :key="page"
        :href="`#${page}`"
        :class="{
          'bg-gray-200 pointer-events-none': page === currentPage,
        }"
        @click="navigate(page)"
      >
        <component :is="icon" class="h-6 w-6" />
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>
