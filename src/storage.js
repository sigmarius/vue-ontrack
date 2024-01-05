import { APP_NAME, MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR } from '@/constants'
import { today, isToday } from '@/time'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'

function syncIdleSeconds(timelineItems, lastActiveAt) {
    // модифицируем массив timelineItems
    const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

    if (activeTimelineItem) {
        activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
    }

    return timelineItems
}

// вычисляет окончание часа, при котором мы начали замерять время для активности
function getEndOfIdleHour(lastActiveAt) {
  const endOfIdleHour = new Date(lastActiveAt);

  // добавляем 1 час к дате последнего закрытия приложения
  endOfIdleHour.setTime(endOfIdleHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND);

  // получаем дату конца того часа, при котором мы начали замерять активность
  endOfIdleHour.setMinutes(0, 0, 0);

  return endOfIdleHour;
}

function calculateIdleSeconds(lastActiveAt) {
  let idleMilliseconds = today() - lastActiveAt;

  // приложение было закрытым более одного часа
  if (lastActiveAt.getHours() !== today().getHours()) {
    idleMilliseconds = getEndOfIdleHour(lastActiveAt) - lastActiveAt
  }

  return idleMilliseconds / MILLISECONDS_IN_SECOND;
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
