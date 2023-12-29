<script setup>
import { computed } from "vue";

import { currentPage, navigate } from "@/router";
import { isNavItemValid } from "@/validators";

// определяем константу props если ссылаемся на пропсы в теге <script>
const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid,
  },
});

const classes = computed(() => [
  "p-2 flex flex-col items-center text-xs capitalize",
  { "bg-gray-200 pointer-events-none": props.navItem.page === currentPage.value },
]);
</script>

<template>
  <li class="flex-1">
    <a
      :href="`#${navItem.page}`"
      :class="classes"
      @click="navigate(navItem.page)"
    >
        <component :is="navItem.icon" class="h-6 w-6" />
        {{ navItem.page }}
    </a>
  </li>
</template>
