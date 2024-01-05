import { APP_NAME } from '@/constants'
import { today, isToday, endOfHour, toSeconds } from '@/time'
import { activeTimelineItem, timelineItems } from '@/timeline-items'
import { activities } from '@/activities'
import { startTimelineItemTimer, stopTimelineItemTimer, resetTimelineItems } from '@/timeline-item-timer'

function syncIdleSeconds(timelineItems, lastActiveAt) {
    // модифицируем массив timelineItems
    const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

    if (activeTimelineItem) {
        activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
    }

    return timelineItems
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
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

  timelineItems.value = state.timelineItems ?? timelineItems.value

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    // если приложение открыто в текущий день
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}
