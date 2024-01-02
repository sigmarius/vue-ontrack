<script setup>
import { ref, watch } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";

import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
  MILLISECONDS_IN_SECOND,
} from "@/constants";

import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from "@/icons";

import { isTimelineItemValid } from "@/validators";
import { formatSeconds, getCurrentHour } from "@/functions";

import { updateTimelineItem } from "@/timeline-items";

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const seconds = ref(props.timelineItem.activitySeconds);

// по умолчанию секундомер остановлен
const isRunning = ref(false);

// кнопка включения секундомера доступна только для текущего часа
const isStartButtonDisabled = props.timelineItem.hour !== getCurrentHour();

const temp = 120;

// функция отслеживает изменение реактивной переменной
// предпринимает действия при изменении ее состояния
watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value * temp })
  }
);

function start() {
  // isRunning хранит ссылку на таймер
  isRunning.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + temp
    });

    seconds.value++;
  }, MILLISECONDS_IN_SECOND);
}

function stop() {
  clearInterval(isRunning.value);

  isRunning.value = false;
}

function reset() {
  stop();

  updateTimelineItem(
    props.timelineItem,
    { activitySeconds: props.timelineItem.activitySeconds - seconds.value * temp }
  );

  seconds.value = 0;
}
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>

    <BaseButton
      v-else
      :disabled="isStartButtonDisabled"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
