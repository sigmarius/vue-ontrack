<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheNav from "@/components/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/constants";

import { ref } from "vue";

const currentPage = ref(normalizePageHash());

function normalizePageHash() {
  const hash = window.location.hash.slice(1);

  if (
    Object.keys([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS]).includes(hash)
  ) {
    return hash;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

function goToPage(page) {
  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}
</script>

<template>
  <!-- @go-to-timeline в html атрибуты пишутся в кебаб-кейс -->
  <TheHeader
    @go-to-timeline="goToPage(PAGE_TIMELINE)"
    @go-to-progress="goToPage(PAGE_PROGRESS)"
  />

  <main class="flex flex-col flex-grow">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" />

    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />

    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <!-- :current-page передаем пропс в дочерний компонент в кебаб-кейс -->
  <!-- @navigate слушаем событие, переданное из дочернего компонента -->
  <!-- $event данные, переданные вторым аргументом из дочернего компонента -->
  <TheNav
    :current-page="currentPage"
    @navigate="goToPage($event)"
  />
</template>

<style scoped></style>
