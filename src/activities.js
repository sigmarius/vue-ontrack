import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from '@/constants';

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

export const activities = ref([])

export const trackedActivities = computed(() =>
  activities.value.filter(( { secondsToComplete }) => secondsToComplete)
)

// чтобы выполнить повторно функцию, зависящую от реактивных переменных
// используется функция computed(() => {})
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function initializeActivities(state) {
    // если данных в хранилище нет, присваиваем дефолтные значения
    activities.value = state.activities || []
}

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
