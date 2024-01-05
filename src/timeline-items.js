import { ref, computed, watchEffect } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from '@/constants'
import { now } from '@/time'

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false
  }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

// глобальный таймер
export const timelineItemTimer = ref(false)

export const timelineItems = ref(generateTimelineItems())

// определяем, существует ли у нас активный объект timelineItem (запущен ли секундомер для этого объекта)
export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive)
)

export const timelineItemRefs = ref([])

// запуск глобального таймера timelineItemTimer
export function startTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, {
    isActive: true
  })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, {
    isActive: false
  })

  clearInterval(timelineItemTimer.value)

  timelineItemTimer.value = false
}

export function resetTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, {
    activitySeconds: 0
  })

  stopTimelineItemTimer(timelineItem)
}

// отслеживаем когда поменяется час, если был активен какой-либо секундомер, его нужно остановить автоматически
watchEffect(() => {
  if (
    activeTimelineItem.value
    && activeTimelineItem.value.hour !== now.value.getHours()) {
    stopTimelineItemTimer(activeTimelineItem.value)
  }
})

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0
    })
  )
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(now.value.getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
  // $el - получает корневой элемент vue-компонента
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  el.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant'
  })
}
