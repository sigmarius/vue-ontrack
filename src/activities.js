import { ref, computed } from 'vue'

import { generateActivitySelectOptions, generateActivities } from '@/functions'

export const activities = ref(generateActivities())

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
  activities.value.push(activity)
}

export function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
    activity.secondsToComplete = secondsToComplete || 0;
  }
