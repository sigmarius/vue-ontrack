<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";
import {
  generatePeriodSelectOptions,
} from "@/functions";

import { currentPage, timelineRef } from "@/router";

import { provide, readonly } from "vue";

import * as keys from "@/keys";

import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
} from "@/activities";

import {
  timelineItems,
  setTimelineItemActivity,
  updateTimelineItemActivitySeconds,
} from "@/timeline-items";

// функция provide(key, function) обеспечивает доступ по ключу key к определенной функции родительского компонента (function) всем дочерним компонентам, вместо того, чтобы отправлять множество кастомных событий наверх
provide(
  keys.updateTimelineItemActivitySecondsKey,
  updateTimelineItemActivitySeconds
);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);

provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);

// доступ к результату выполнения функции
// readonly => запрещает модификацию данных из дочернего компонента
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

// также можно предоставлять доступ к свойствам родительского компонента
// value -> если переменная является реактивной
// через provide всегда передается сама переменная, без value
// readonly => запрещает модификацию данных из дочернего компонента
provide(keys.timelineItemsKey, readonly(timelineItems));

// также можно передавать и computed свойства, через value
// readonly => запрещает модификацию данных из дочернего компонента
// .value обеспечивает доступ к начальному состоянию переменной,
// для сохранения реактивности между модулями через provide нужно передавать саму переменную
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
</script>

<template>
  <!-- @go-to-timeline в html атрибуты пишутся в кебаб-кейс -->
  <TheHeader />

  <main class="flex flex-col flex-grow">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />

    <!-- в шаблоне ссылаться на свойство value для реактивных элементов не обязательно, vue сделает это автоматически -->
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
    />

    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>

<style scoped></style>
@/activities
