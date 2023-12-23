<script setup>
const props = defineProps(["timelineItem"]);

const hourLinkClasses = [
  "absolute -top-4 left-1/2 -translate-x-1/2 px-2 font-mono text-lg rounded",
  props.timelineItem.hour === new Date().getHours()
    ? "font-black text-white bg-purple-900"
    : "text-gray-500 bg-gray-100",
];
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <a href="#" :class="hourLinkClasses"> {{ timelineItem.hour }}:00 </a>
  </li>
</template>
