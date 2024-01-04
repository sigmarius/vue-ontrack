<script setup>
import { computed } from "vue";
import { isHourValid } from "@/validators";
import { now } from "@/time";
import { scrollToHour } from "@/timeline-items";

const props = defineProps({
  hour: {
    type: Number,
    required: true,
    validator: isHourValid,
  },
});

const classes = computed(() => [
  "absolute -top-4 left-1/2 -translate-x-1/2 px-2 font-mono text-lg rounded",
  props.hour === now.value.getHours()
    ? "font-black text-white bg-purple-900"
    : "text-gray-500 bg-gray-100",
]);

const formattedHour = `${props.hour.toString().padStart(2, 0)}:00`;
</script>

<template>
  <a href="#"
    :class="classes"
    @click.prevent="scrollToHour(hour)"
  >
    {{ formattedHour }}
  </a>
</template>
