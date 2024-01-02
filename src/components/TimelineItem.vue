<script setup>
import { updateTimelineItem } from "@/timeline-items";
import { activitySelectOptions } from "@/activities";

import BaseSelect from "@/components/BaseSelect.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import TimelineStopWatch from "@/components/TimelineStopWatch.vue";

import { isTimelineItemValid } from "@/validators";

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <TimelineHour
      :hour="timelineItem.hour"
    />

    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />

    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
