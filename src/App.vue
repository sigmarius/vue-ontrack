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

import { ref, computed } from "vue";

const currentPage = ref(normalizePageHash());

function goToPage(page) {
  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}

const timelineItems = ref(generateTimelineItems());

const activities = ref(generateActivities());

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value)
);

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
}

function createActivity(activity) {
  activities.value.push(activity);
}

function setTimelineItemActivity({ timelineItem, activity }) {
  timelineItem.activityId = activity?.id || null;
}
</script>

<template>
  <!-- @go-to-timeline в html атрибуты пишутся в кебаб-кейс -->
  <TheHeader @navigate="goToPage($event)" />

  <main class="flex flex-col flex-grow">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      @set-timeline-item-activity="setTimelineItemActivity"
    />

    <!-- в шаблоне ссылаться на свойство value для реактивных элементов не обязательно, vue сделает это автоматически -->
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
    />

    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <!-- :current-page передаем пропс в дочерний компонент в кебаб-кейс -->
  <!-- @navigate слушаем событие, переданное из дочернего компонента -->
  <!-- $event данные, переданные вторым аргументом из дочернего компонента -->
  <TheNav :current-page="currentPage" @navigate="goToPage($event)" />
</template>

<style scoped></style>
