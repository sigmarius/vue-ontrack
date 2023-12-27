<script setup>
import BaseSelect from "@/components/BaseSelect.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import {
  isTimelineItemValid,
  validateSelectOptions,
  isActivityValid,
  validateActivities,
} from "@/validators";
import { NULLABLE_ACTIVITY } from "@/constants";

const props = defineProps({
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
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
});

const emit = defineEmits({
  selectActivity: isActivityValid,
});

function selectActivity(id) {
  emit("selectActivity", findActivityById(id));
}

function findActivityById(id) {
  return (
    props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
  );
}
</script>

<template>
  <li class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200">
    <TimelineHour :hour="timelineItem.hour" />

    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="selectActivity"
    />
  </li>
</template>
