<script setup>
import { computed, ref } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'
import { secondsSinceMidnightInPercentage } from '@/time'

const indicatorRef = ref()

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
)

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="absolute z-10 w-full border-b-2 border-red-600 pointer-events-none"
    :style="{ top: `${topOffset}px` }"
  />
</template>
