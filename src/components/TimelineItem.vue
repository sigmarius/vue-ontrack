<script setup>
import { updateTimelineItem } from "@/timeline-items";
import { activitySelectOptions } from "@/activities";

import BaseSelect from "@/components/BaseSelect.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import TimelineStopWatch from "@/components/TimelineStopWatch.vue";

import { isTimelineItemValid, isUndefined } from "@/validators";

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const emit = defineEmits({
  scrollToHour: isUndefined,
});
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour')"
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
