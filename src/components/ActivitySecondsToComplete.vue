<script setup>
import { formatSeconds, getTotalActivitySeconds } from "@/functions";
import { isActivityValid, validateTimelineItems } from "@/validators";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
});

const seconds = formatSeconds(
  getTotalActivitySeconds(props.activity, props.timelineItems) -
    props.activity.secondsToComplete
);
</script>

<template>
  <div
    class="px-2 flex items-center font-mono font-bold text-lg text-purple-600 rounded bg-purple-100"
  >
    {{ seconds }}
  </div>
</template>
