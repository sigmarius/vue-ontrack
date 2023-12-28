<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
} from "@/functions";

import { ref, computed, provide } from "vue";

const currentPage = ref(normalizePageHash());

function goToPage(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    console.log("timeline", timeline.value);

    // доступ предоставлен в компоненте TheTimeline через макрос defineExpose()
    timeline.value.scrollToHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}

const activities = ref(generateActivities());

const timelineItems = ref(generateTimelineItems(activities.value));

const timeline = ref();

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

function setTimelineItemActivity(timelineItem, activity) {
  // timelineItem.activityId = activity?.id || null;
  timelineItem.activityId = activity.id;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds;
}

// функция provide(key, function) обеспечивает доступ по ключу key к определенной функции родительского компонента (function) всем дочерним компонентам, вместо того, чтобы отправлять множество кастомных событий наверх
provide("updateTimelineItemActivitySeconds", updateTimelineItemActivitySeconds);

// также можно предоставлять доступ к свойствам родительского компонента
// value -> если переменная является реактивной
provide("timelineItems", timelineItems.value);
provide("activities", activities.value);

// также можно передавать и computed свойства, через value
provide("activitySelectOptions", activitySelectOptions.value);
</script>

<template>
  <!-- @go-to-timeline в html атрибуты пишутся в кебаб-кейс -->
  <TheHeader @navigate="goToPage($event)" />

  <main class="flex flex-col flex-grow">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="currentPage"
      @set-timeline-item-activity="setTimelineItemActivity"
      ref="timeline"
    />

    <!-- в шаблоне ссылаться на свойство value для реактивных элементов не обязательно, vue сделает это автоматически -->
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />

    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <!-- :current-page передаем пропс в дочерний компонент в кебаб-кейс -->
  <!-- @navigate слушаем событие, переданное из дочернего компонента -->
  <!-- $event данные, переданные вторым аргументом из дочернего компонента -->
  <TheNav :current-page="currentPage" @navigate="goToPage($event)" />
</template>

<style scoped></style>
