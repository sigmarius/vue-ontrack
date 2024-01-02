import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

export function useTotalProgress() {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value.reduce((total, activity) => {
      let trackedSeconds = calculateTrackedActivitySeconds(timelineItems.value, activity)

      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete

      return total + trackedSeconds
    }, 0)
  });

  const percentage = computed(() =>
    calculateCompletionPercentage(totalTrackedSeconds.value)
  )

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  return {
    percentage,
    colorClass
  }
}
