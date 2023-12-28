<script setup>
import { inject } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import TimelineStopWatch from "@/components/TimelineStopWatch.vue";

import {
  isTimelineItemValid,
  isActivityValid,
  isHourValid,
} from "@/validators";
import { NULLABLE_ACTIVITY } from "@/constants";

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

// с помощью inject('key') можно получать свойства родительского компонента
// по ключу key, указанному в родительском компоненте
const activities = inject("activities");
const activitySelectOptions = inject("activitySelectOptions");

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
});

function selectActivity(id) {
  emit("selectActivity", findActivityById(id));
}

function findActivityById(id) {
  return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY;
}
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />

    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="selectActivity"
    />

    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
