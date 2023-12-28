<script setup>
import { ref } from "vue";
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/BaseButton.vue";

import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
  MILLISECONDS_IN_SECOND,
} from "@/constants";

import { isNumber } from "@/validators";
import { formatSeconds } from "@/functions";

const props = defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber,
  },
});

const seconds = ref(props.seconds);

// по умолчанию секундомер остановлен
const isRunning = ref(false);

function start() {
  // isRunning хранит ссылку на таймер
  isRunning.value = setInterval(() => {
    seconds.value++;
  }, MILLISECONDS_IN_SECOND);
}

function stop() {
  clearInterval(isRunning.value);

  isRunning.value = false;
}

function reset() {
  stop();

  seconds.value = 0;
}
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton
      v-if="isRunning"
      :type="BUTTON_TYPE_WARNING"
      @click="stop"
    >
      <PauseIcon class="h-8" />
    </BaseButton>

    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
