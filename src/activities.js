import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from '@/constants';
import { id } from '@/functions';

function generateActivities() {
  return ['Coding', 'Training', 'Reading']
  .map((name) => ({
      id: id(),
      name,
      secondsToComplete: 15 * 60 //idx * SECONDS_IN_HOUR
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map(activity => ({
    label: activity.name,
    value: activity.id
  }));
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
});

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

export function calculateActivityCompletionPercentage({ secondsToComplete}, trackedSeconds) {
 return Math.floor(
    (trackedSeconds * HUNDRED_PERCENT) / secondsToComplete
    );
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor(
    (totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value
    );
}
