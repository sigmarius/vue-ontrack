<script setup>
import { computed } from "vue";
import { getProgressColorClass, formatSeconds } from "@/functions";
import { getActivityProgress } from "@/activities"
import { getTotalActivitySeconds } from "@/timeline-items";
import { isActivityValid } from "@/validators";

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
});

const progress = computed(() => getActivityProgress(props.activity));
</script>

<template>
  <li class="p-4 flex flex-col gap-1">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="h-5 flex overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(progress)"
        :style="`width: ${progress}%;`"
        ></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span>
        {{ formatSeconds(getTotalActivitySeconds(activity)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
