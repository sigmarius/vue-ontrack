<script setup>
import { ref } from "vue";

import BaseSelect from "@/components/BaseSelect.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import { isTimelineItemValid, validateSelectOptions } from "@/validators";

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
});

const selectedActivityId = ref(null);
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <TimelineHour :hour="timelineItem.hour" />

    <BaseSelect
      :options="activitySelectOptions"
      :selected="selectedActivityId"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
