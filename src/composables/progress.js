import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { calculateActivityCompletionPercentage } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

export function useProgress(activity) {
  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
  )

  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity)
  )

    // обращаемся к computed свойству через value
    const colorClass = computed(() => getProgressColorClass(percentage.value))

  return {
    percentage,
    trackedActivitySeconds,
    colorClass
  }
}
