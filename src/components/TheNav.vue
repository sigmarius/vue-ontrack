<script setup>
import NavItem from '@/components/NavItem.vue'

import { NAV_ITEMS } from '@/constants'
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex justify-around items-center border-t">
      <NavItem v-for="navItem in NAV_ITEMS" :key="navItem.page" :nav-item="navItem" />
    </ul>
  </nav>
</template>
