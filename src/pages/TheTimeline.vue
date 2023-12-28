<script setup>
import { watchPostEffect, ref, nextTick } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
} from "@/validators";

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants";

const props = defineProps({
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
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid,
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

// хук onMounted(() => {}) позволяет выполнить код после того, как vue-компонент будет полностью готов, и все его элементы будут отрендерены в DOM-дереве, выполняется только один раз

// watchEffect(() => {}) вызывается каждый раз при изменении значения реактивной переменной
// watchPostEffect(() => {}) вызывается каждый раз после изменения значения реактивной переменной и перерисовки DOM-дерева
watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    // ждем пока vue обновит страницу
    await nextTick();

    // получаем текущий час
    scrollToHour(new Date().getHours());
  }
});

function scrollToHour(hour) {
  // определяем текущий час
  // const currentHour = new Date().getHours();

  // $el - получает корневой элемент vue-компонента
  hour === MIDNIGHT_HOUR
    ? document.body.scrollIntoView()
    : timelineItemRefs.value[hour - 1].$el.scrollIntoView();
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
        @scroll-to-hour="scrollToHour"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
