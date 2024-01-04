import { APP_NAME, MILLISECONDS_IN_SECOND } from '@/constants'
import { today, isToday } from '@/time'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'

function syncIdleSeconds(timelineItems, lastActiveAt) {
    // модифицируем массив timelineItems
    const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

    if (activeTimelineItem) {
        activeTimelineItem.activitySeconds += (today() - lastActiveAt) / MILLISECONDS_IN_SECOND
    }

    return timelineItems
}

export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}

export function loadState() {
  const serializedState = localStorage.getItem(APP_NAME)

  const state = serializedState ? JSON.parse(serializedState) : {}

  // если данных в хранилище нет, присваиваем дефолтные значения
  activities.value = state.activities || activities.value

  const lastActiveAt = new Date(state.lastActiveAt)

  // если приложение открыто в текущий день
  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value
}
