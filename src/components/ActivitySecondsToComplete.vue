<script setup>
import { computed } from "vue";
import { formatSeconds } from "@/functions";
import { isActivityValid } from "@/validators";
import { calculateTrackedActivitySeconds } from "@/timeline-items";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});

const sign = computed(() => (secondsDiff.value >= 0 ? "+" : "-"));

const secondsDiff = computed(
  () =>
  calculateTrackedActivitySeconds(props.activity) -
    props.activity.secondsToComplete
);

const colorClasses = computed(() =>
  secondsDiff.value < 0
    ? "text-red-600 bg-red-100"
    : "text-green-600 bg-green-100"
);

const classes = computed(
  () =>
    `px-2 flex items-center font-mono font-bold text-lg rounded ${colorClasses.value}`
);

const seconds = computed(
  () => `${sign.value}${formatSeconds(secondsDiff.value)}`
);
</script>

<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>
