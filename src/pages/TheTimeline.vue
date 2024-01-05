<script setup>
import { onActivated, onDeactivated } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import TheTimelineIndicator from "@/components/TheTimelineIndicator.vue";
import {
  timelineItems,
  timelineItemRefs,
  scrollToCurrentHour,
  stopTimelineItemTimer
} from "@/timeline-items";
import { startCurrentDateTimer, stopCurrentDateTimer } from "@/time";

// хук onMounted(() => {}) позволяет выполнить код после того, как vue-компонент будет полностью готов, и все его элементы будут отрендерены в DOM-дереве, выполняется только один раз

// watchEffect(() => {}) вызывается каждый раз при изменении значения реактивной переменной
// watchPostEffect(() => {}) вызывается каждый раз после изменения значения реактивной переменной и перерисовки DOM-дерева

// onActivated(() => {}) выполняется при активации компонента страницы
// onActivated(() => {
//   scrollToCurrentHour(false);
// });

// останавливаем глобальный секундомер в самый первый раз при создании приложения
stopTimelineItemTimer();

onActivated(() => {
  scrollToCurrentHour();
  startCurrentDateTimer()
});

// при переходе на другую страницу останавливаем индикатор
onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class="relative mt-7">
    <TheTimelineIndicator />
    <ul>
      <!-- ref в html предоставляет доступ к DOM-элементу в js -->
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :timeline-items="timelineItems"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
