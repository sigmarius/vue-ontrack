<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps(["timelineItem"]);

const hourLinkClasses = [
  "absolute -top-4 left-1/2 -translate-x-1/2 px-2 font-mono text-lg rounded",
  props.timelineItem.hour === new Date().getHours()
    ? "font-black text-white bg-purple-900"
    : "text-gray-500 bg-gray-100",
];

const options = [
  { value: 1, label: "Coding" },
  { value: 2, label: "Reading" },
  { value: 3, label: "Training" },
];
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <a href="#" :class="hourLinkClasses"> {{ timelineItem.hour }}:00 </a>

    <div class="flex gap-2">
      <button
        class="p-3 rounded bg-gray-100 enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <XMarkIcon class="h-8" />
      </button>
      <select
        name=""
        id=""
        class="py-1 px-2 w-full text-2xl truncate rounded bg-gray-100"
      >
        <option selected disabled value="">Rest</option>
        <option v-for="{ value, label } in options" :value="value" :key="value">
          {{ label }}
        </option>
      </select>
    </div>
  </li>
</template>
