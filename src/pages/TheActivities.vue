<script setup>
import { validateActivities } from "@/validators";

import ActivityItem from "@/components/ActivityItem.vue";
import TheActivityForm from "@/components/TheActivityForm.vue";
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue";

defineProps({
  activities: {
    type: Array,
    required: true,
    // валидатор первым аргументом принимает пропс, который проверяет
    validator: validateActivities,
  },
});
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm />
  </div>
</template>
