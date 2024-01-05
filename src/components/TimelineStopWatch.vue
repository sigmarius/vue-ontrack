<script setup>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";

import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
} from "@/constants";

import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from "@/icons";

import { isTimelineItemValid } from "@/validators";
import { formatSeconds } from "@/functions";
import { now } from "@/time"
import {
  timelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  resetTimelineItemTimer
} from "@/timeline-item-timer"

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      :disabled="!timelineItem.activitySeconds"
      @click="$event => resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>

    <BaseButton
      v-if="timelineItemTimer && timelineItem.hour === now.getHours()"
      :type="BUTTON_TYPE_WARNING"
      @click="$event => stopTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>

    <BaseButton
      v-else
      :disabled="timelineItem.hour !== now.getHours()"
      :type="BUTTON_TYPE_SUCCESS"
      @click="$event => startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
