<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";
import { normalizePageHash, generateTimelineItems, generateActivitySelectOptions } from "@/functions";

import { ref } from "vue";

const currentPage = ref(normalizePageHash());

function goToPage(page) {
  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}

const timelineItems = generateTimelineItems();

const activities = ["Coding", "Reading", "Training"];

const activitySelectOptions = generateActivitySelectOptions(activities);
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

    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
    />

    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <!-- :current-page передаем пропс в дочерний компонент в кебаб-кейс -->
  <!-- @navigate слушаем событие, переданное из дочернего компонента -->
  <!-- $event данные, переданные вторым аргументом из дочернего компонента -->
  <TheNav :current-page="currentPage" @navigate="goToPage($event)" />
</template>

<style scoped></style>
