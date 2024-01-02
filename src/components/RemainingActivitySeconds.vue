<script setup>
import { computed } from "vue";
import { formatSecondsWithSign } from "@/functions";
import { isActivityValid } from "@/validators";
import {
  timelineItems,
  calculateTrackedActivitySeconds,
} from "@/timeline-items";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});

const remainingSeconds = computed(
  () =>
    calculateTrackedActivitySeconds(timelineItems.value, props.activity) -
    props.activity.secondsToComplete
);

const classes = computed(() => [
  "px-2 flex items-center font-mono font-bold text-lg rounded",
  remainingSeconds.value < 0
    ? "text-red-600 bg-red-100"
    : "text-green-600 bg-green-100",
]);
</script>

<template>
  <div :class="classes">
    {{ formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>
