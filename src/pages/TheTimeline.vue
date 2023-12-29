<script setup>
import { watchPostEffect, ref, nextTick } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { validateTimelineItems } from "@/validators";

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants";

import { currentPage } from "@/router";

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
});

// макрос defineExpose() предоставляет доступ к локальным функциям дочернего компонента для компонента-родителя
defineExpose({ scrollToHour });

const timelineItemRefs = ref([]);

// хук onMounted(() => {}) позволяет выполнить код после того, как vue-компонент будет полностью готов, и все его элементы будут отрендерены в DOM-дереве, выполняется только один раз

// watchEffect(() => {}) вызывается каждый раз при изменении значения реактивной переменной
// watchPostEffect(() => {}) вызывается каждый раз после изменения значения реактивной переменной и перерисовки DOM-дерева
watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    // ждем пока vue обновит страницу
    await nextTick();

    // получаем текущий час
    scrollToHour(null, false);
  }
});

function scrollToHour(hour = null, isSmooth = true) {
  const options = {
    behavior: isSmooth ? "smooth" : "instant",
  };

  // если первый параметр не указан, присваивание выполняется
  hour ??= new Date().getHours();

  // $el - получает корневой элемент vue-компонента
  hour === MIDNIGHT_HOUR
    ? document.body.scrollIntoView(options)
    : timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
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
        :timeline-items="timelineItems"
        @scroll-to-hour="scrollToHour"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
