import { ref } from 'vue';
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants';
import { now } from "@/time"
// import { activities } from '@/activities';

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    // для удобства тестирования делаем активными первые 5 часов
    activityId: null, // [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0 // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0

    // случайным образом рассчитываем activityId и activitySeconds
    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR
  }))
}

function filterTimelineItemsByActivity( timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

export const timelineItems = ref(generateTimelineItems())

export const timelineItemRefs = ref([]);

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
    return filterTimelineItemsByActivity(timelineItems, activity)
    .forEach((timelineItem) => updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === now.value.getHours()
        ? timelineItem.activitySeconds
        : 0
    }))
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce(
      (total, seconds) => Math.round(total + seconds), 0
    )
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(now.value.getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
  // $el - получает корневой элемент vue-компонента
  const el =
    hour === MIDNIGHT_HOUR
      ? document.body
      : timelineItemRefs.value[hour - 1].$el;

  el.scrollIntoView({
    behavior: isSmooth ? "smooth" : "instant",
  });
}
