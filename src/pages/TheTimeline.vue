<script setup>
import { generateTimelineItems } from "@/functions";
import TimelineItem from "@/components/TimelineItem.vue";

const timeline_items = generateTimelineItems();
console.log(timeline_items);
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timeline_items"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
