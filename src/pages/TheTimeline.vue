<script setup>
import { watchPostEffect, nextTick } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { PAGE_TIMELINE } from "@/constants";
import { currentPage } from "@/router";
import { timelineItems, timelineItemRefs, scrollToHour } from "@/timeline-items";

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
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
