<script setup>
import { formatSeconds } from '@/functions'
import { isActivityValid } from '@/validators'
import { useProgress } from '@/composables/progress'
import { HUNDRED_PERCENT } from '@/constants'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const { percentage, trackedActivitySeconds, colorClass } = useProgress(props.activity)
</script>

<template>
  <li class="p-4 flex flex-col gap-1">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="h-5 flex overflow-hidden rounded bg-neutral-200">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
      ></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
