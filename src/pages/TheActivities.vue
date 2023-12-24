<script setup>
import { validateActivities } from "@/validators";

import ActivityItem from "@/components/ActivityItem.vue";

defineProps({
  activities: {
    type: Array,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: validateActivities
  },
});
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
      />
    </ul>
  </div>
</template>
