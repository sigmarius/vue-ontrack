<script setup>
import { computed } from "vue";
import { getProgressColorClass, formatSeconds } from "@/functions";
import { calculateActivityCompletionPercentage } from "@/activities"
import { timelineItems, calculateTrackedActivitySeconds } from "@/timeline-items";
import { isActivityValid } from "@/validators";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
});

const percentage = computed(() =>
  calculateActivityCompletionPercentage(
    props.activity,
    trackedActivitySeconds.value
  ));

const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity)
);
</script>

<template>
  <li class="p-4 flex flex-col gap-1">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="h-5 flex overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(percentage)"
        :style="`width: ${percentage}%;`"
        ></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
