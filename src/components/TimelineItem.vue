<script setup>
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";
import TimelineHour from "@/components/TimelineHour.vue";
import {
  isTimelineItemValid,
  validateSelectOptions,
  isActivityValid,
  validateActivities,
} from "@/validators";
import {
  NULLABLE_ACTIVITY,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS
} from "@/constants";
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";

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

    <div class="w-full flex gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <ArrowPathIcon class="h-8" />
      </BaseButton>

      <div
        class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
      >
        00:00:00
      </div>

      <BaseButton :type="BUTTON_TYPE_WARNING">
        <PauseIcon class="h-8" />
      </BaseButton>

      <BaseButton :type="BUTTON_TYPE_SUCCESS">
        <PlayIcon class="h-8" />
      </BaseButton>
    </div>
  </li>
</template>
