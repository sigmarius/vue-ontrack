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

export const trackedActivities = computed(() =>
  activities.value.filter(( { secondsToComplete }) => secondsToComplete)
)

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields);
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
