<script setup>
import {
  validateActivities,
  isActivityValid,
  validateTimelineItems,
  isNumber
} from "@/validators";

import ActivityItem from "@/components/ActivityItem.vue";
import TheActivityForm from "@/components/TheActivityForm.vue";
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue";

defineProps({
  activities: {
    type: Array,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: validateActivities,
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
});

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
  setActivitySecondsToComplete(activity, secondsToComplete) {
    // проверяем что оба значения являются true
    return [
      isActivityValid(activity),
      isNumber(secondsToComplete)
    ].every(Boolean);
  },
});

function setSecondsToComplete(activity, secondsToComplete) {
  emit("setActivitySecondsToComplete", activity, secondsToComplete);
}
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="timelineItems"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
