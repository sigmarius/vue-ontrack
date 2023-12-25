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
} from "@/functions";

import { ref } from "vue";

const currentPage = ref(normalizePageHash());

function goToPage(page) {
  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}

const timelineItems = generateTimelineItems();

const activities = ref(["Coding", "Reading", "Training"]);

// обращение к реактивным переменным всегда через свойство value
const activitySelectOptions = generateActivitySelectOptions(activities.value);

function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1);
}

function createActivity(activity) {
  activities.value = [activity, ...activities.value];
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
