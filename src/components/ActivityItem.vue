<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";

import { isActivityValid, isUndefined, isNumber } from "@/validators";

import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from "@/constants";

import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue";

defineProps({
  activity: {
    type: Object,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: isActivityValid,
  },
});

const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber,
});
</script>

<template>
  <li class="p-4 flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        :options="PERIOD_SELECT_OPTIONS"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        @select="emit('setSecondsToComplete', $event || 0)"
        class="grow font-mono"
      />

      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
