<script setup>
import { computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { currentPage, navigate } from "@/router";
import { isNavItemValid } from "@/validators";
import { PAGE_TIMELINE } from "@/constants";
import { scrollToCurrentHour } from "@/timeline-items";

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
  props.navItem.page === currentPage.value ? "bg-gray-200" : "hover:bg-gray-200"
]);

function handleClick() {
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1">
    <a
      :href="`#${navItem.page}`"
      :class="classes"
      @click="handleClick"
    >
        <BaseIcon :name="navItem.icon" class="h-6 w-6" />
        {{ navItem.page }}
    </a>
  </li>
</template>
