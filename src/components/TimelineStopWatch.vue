<script setup>
import { watch, watchEffect, onMounted } from "vue";
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
import { updateTimelineItem } from "@/timeline-items";
import { useStopwatch } from "@/composables/stopwatch";
import { now } from "@/time"

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const { seconds, isRunning, start, stop, reset } = useStopwatch(
  props.timelineItem.activitySeconds
);

onMounted(() => {
  if (props.timelineItem.isActive) {
    start()
  }
})

watchEffect(() => {
  if (
    props.timelineItem.hour !== now.value.getHours()
    && isRunning.value
    ) {
      stop();
    }
})

watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  })
);

// отслеживаем isRunning, функция срабатывает каждый раз при изменении состояния секундомера
watch(
  isRunning,
  () =>
    updateTimelineItem(props.timelineItem, {
    isActive: Boolean(isRunning.value)
  })

)
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>

    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>

    <BaseButton
      v-else
      :disabled="timelineItem.hour !== now.getHours()"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
