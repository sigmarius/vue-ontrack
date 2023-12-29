<script setup>
import { ref, watch } from "vue";
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/BaseButton.vue";

import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
  MILLISECONDS_IN_SECOND,
} from "@/constants";

import { isTimelineItemValid } from "@/validators";
import { formatSeconds, getCurrentHour } from "@/functions";

import { updateTimelineItemActivitySeconds } from "@/timeline-items";

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

// функция отслеживает изменение реактивной переменной
// предпринимает действия при изменении ее состояния
watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItemActivitySeconds(props.timelineItem, seconds.value)
  }
);

function start() {
  // isRunning хранит ссылку на таймер
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, props.timelineItem.activitySeconds + 1);

    seconds.value++;
  }, MILLISECONDS_IN_SECOND);
}

function stop() {
  clearInterval(isRunning.value);

  isRunning.value = false;
}

function reset() {
  stop();

  updateTimelineItemActivitySeconds(
    props.timelineItem,
    props.timelineItem.activitySeconds - seconds.value
  );

  seconds.value = 0;
}
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>

    <BaseButton
      v-else
      :disabled="isStartButtonDisabled"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
