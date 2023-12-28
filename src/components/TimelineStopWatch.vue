<script setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/BaseButton.vue";

import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
} from "@/constants";

import { isNumber } from "@/validators";
import { formatSeconds } from "@/functions";

defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber,
  },
});
</script>

<template>
  <div class="w-full flex gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER">
      <ArrowPathIcon class="h-8" />
    </BaseButton>

    <div
      class="px-2 flex grow items-center font-mono text-3xl rounded bg-gray-100"
    >
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton :type="BUTTON_TYPE_WARNING">
      <PauseIcon class="h-8" />
    </BaseButton>

    <BaseButton :type="BUTTON_TYPE_SUCCESS">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
