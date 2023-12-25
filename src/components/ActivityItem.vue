<script setup>
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";

import { isActivityValid } from "@/validators";

import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from "@/constants";

defineProps({
  activity: {
    type: String,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: isActivityValid,
  },
});

const secondsToComplete = ref(null);
</script>

<template>
  <li class="p-4 flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity }}</span>
    </div>

    <div>
      <BaseSelect
        :options="PERIOD_SELECT_OPTIONS"
        placeholder="h:mm"
        :selected="secondsToComplete"
        @select="secondsToComplete = $event"
        class="font-mono"
      />
    </div>
  </li>
</template>
