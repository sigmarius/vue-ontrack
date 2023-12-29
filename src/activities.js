import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from '@/constants';
import { id } from '@/functions';

function generateActivities() {
  return ['Coding', 'Training', 'Reading']
  .map((name, idx) => ({
      id: id(),
      name,
      secondsToComplete: idx * SECONDS_IN_HOUR
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map(activity => ({
    label: activity.name,
    value: activity.id
  }));
}

export const activities = ref(generateActivities())

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
  activities.value.push(activity)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
    activity.secondsToComplete = secondsToComplete || 0;
  }
