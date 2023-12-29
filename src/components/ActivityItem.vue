<script setup>
import { inject } from "vue";
import {
  periodSelectOptionsKey,
  setActivitySecondsToCompleteKey,
  deleteActivityKey,
} from "@/keys";

import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";

import { isActivityValid } from "@/validators";

import { BUTTON_TYPE_DANGER } from "@/constants";

import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue";

defineProps({
  activity: {
    type: Object,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: isActivityValid,
  },
});

const periodSelectOptions = inject(periodSelectOptionsKey);

const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey);

const deleteActivity = inject(deleteActivityKey);
</script>

<template>
  <li class="p-4 flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        :options="periodSelectOptions"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        class="grow font-mono"
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />

      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
