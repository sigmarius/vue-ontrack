<script setup>
import { computed } from "vue";

import { currentPage, navigate } from "@/router";
import { isPageValid } from "@/validators";

// определяем константу props если ссылаемся на пропсы в теге <script>
const props = defineProps({
  page: {
    type: String,
    required: true,
    validator: isPageValid,
  },
});

const classes = computed(() => [
  "p-2 flex flex-col items-center text-xs capitalize",
  { "bg-gray-200 pointer-events-none": props.page === currentPage.value },
]);
</script>

<template>
  <li class="flex-1">
    <a
      :href="`#${page}`"
      :class="classes"
      @click="navigate(page)"
    >
      <slot></slot>
    </a>
  </li>
</template>
