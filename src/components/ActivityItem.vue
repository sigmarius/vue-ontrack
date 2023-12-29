<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import { isActivityValid } from "@/validators";

import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "@/constants";

import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue";

import { updateActivity, deleteActivity } from "@/activities";
import { resetTimelineItemActivities } from "@/timeline-items";

defineProps({
  activity: {
    type: Object,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: isActivityValid,
  },
});

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(activity);
  deleteActivity(activity);
};
</script>

<template>
  <li class="p-4 flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon name="Trash" class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        :options="PERIOD_SELECT_OPTIONS"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        class="grow font-mono"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />

      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
