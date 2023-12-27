<script setup>
import TimelineItem from "@/components/TimelineItem.vue";
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isNull,
} from "@/validators";

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
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
  setTimelineItemActivity({ timelineItem, activity }) {
    return [
      isTimelineItemValid(timelineItem),
      isNull(activity) || isActivityValid(activity),
    ].every(Boolean);
  },
});
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        @select-activity="
          emit('setTimelineItemActivity', {
            timelineItem,
            activity: $event,
          })
        "
      />
    </ul>
  </div>
</template>
