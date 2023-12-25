<script setup>
import { validateActivities, isActivityValid } from "@/validators";

import ActivityItem from "@/components/ActivityItem.vue";

import BaseButton from "@/components/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

defineProps({
  activities: {
    type: Array,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: validateActivities,
  },
});

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
});

let newActivity = "";
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>

    <form
      class="sticky bottom-[57px] p-4 flex gap-2 border-t bg-white"
      @submit.prevent="emit('createActivity', newActivity)"
    >
      <input
        type="text"
        class="w-full px-4 rounded border text-xl"
        placeholder="Activity name"
        :value="newActivity"
        @input="newActivity = $event.target.value"
      />

      <BaseButton>
        <PlusIcon class="h-8" />
      </BaseButton>
    </form>
  </div>
</template>
