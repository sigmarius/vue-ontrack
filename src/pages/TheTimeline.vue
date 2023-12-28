<script setup>
import { onMounted, ref } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
} from "@/validators";

import { MIDNIGHT_HOUR } from "@/constants";

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
});

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(
      Boolean
    );
  },
});

const timelineItemRefs = ref([]);

// хук onMounted(() => {}) позволяет выполнить код после того, как vue-компонент будет полностью готов, и все его элементы будут отрендерены в DOM-дереве
onMounted(scrollToCurrentTimelineItem);

function scrollToCurrentTimelineItem() {
  // определяем текущий час
  const currentHour = new Date().getHours();

  // $el - получает корневой элемент vue-компонента
  currentHour === MIDNIGHT_HOUR
    ? document.body.scrollIntoView()
    : timelineItemRefs.value[currentHour - 1].$el.scrollIntoView();
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <!-- ref в html предоставляет доступ к DOM-элементу в js -->
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
