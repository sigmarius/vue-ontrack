import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

export function useTotalProgress() {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  return {
    percentage,
    colorClass
  }
}
