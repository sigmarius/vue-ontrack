<script setup>
import { validateActivities, isActivityValid } from "@/validators";

import ActivityItem from "@/components/ActivityItem.vue";

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
});
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
  </div>
</template>
