import { APP_NAME } from "@/constants"
import { today, isToday } from "@/time"
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'

export function saveState() {
    localStorage.setItem(APP_NAME, JSON.stringify({
        timelineItems: timelineItems.value,
        activities: activities.value,
        date: today()
    }))
}

export function loadState() {
    const serializedState = localStorage.getItem(APP_NAME)

    const state = serializedState ? JSON.parse(serializedState) : {}

    // если приложение открыто в текущий день
    timelineItems.value = isToday(new Date(state.date))
        ? state.timelineItems
        : timelineItems.value;

    // если данных в хранилище нет, присваиваем дефолтные значения
    activities.value = state.activities || activities.value;
}
