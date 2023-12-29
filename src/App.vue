<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions,
} from "@/functions";

import { currentPage, timelineRef } from "@/router";

import { ref, computed, provide, readonly } from "vue";

import * as keys from "@/keys";

const activities = ref(generateActivities());

const timelineItems = ref(generateTimelineItems(activities.value));

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value)
);

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
}

function createActivity(activity) {
  activities.value.push(activity);
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds;
}

// функция provide(key, function) обеспечивает доступ по ключу key к определенной функции родительского компонента (function) всем дочерним компонентам, вместо того, чтобы отправлять множество кастомных событий наверх
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);

provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);

// доступ к результату выполнения функции
// readonly => запрещает модификацию данных из дочернего компонента
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

// также можно предоставлять доступ к свойствам родительского компонента
// value -> если переменная является реактивной
// readonly => запрещает модификацию данных из дочернего компонента
provide(keys.timelineItemsKey, readonly(timelineItems.value));

// также можно передавать и computed свойства, через value
// readonly => запрещает модификацию данных из дочернего компонента
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
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
