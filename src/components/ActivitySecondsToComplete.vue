<script setup>
import { formatSeconds } from "@/functions";
import { isActivityValid } from "@/validators";

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});
</script>

<template>
  <div
    class="px-2 flex items-center font-mono font-bold text-lg text-purple-600 rounded bg-purple-100"
  >
    {{ formatSeconds(activity.secondsToComplete) }}
  </div>
</template>
