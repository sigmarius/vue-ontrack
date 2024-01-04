import '@/assets/main.css'
import * as storage from "@/storage"
import { createApp } from 'vue'
import App from './App.vue'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'
import { isToday } from '@/time'

function saveState() {
    storage.save({
        timelineItems: timelineItems.value,
        activities: activities.value
    })
}

function loadState() {
    const state = storage.load();

    // если приложение открыто в текущий день
    timelineItems.value = isToday(new Date(state.date))
        ? state.timelineItems
        : timelineItems.value;

    // если данных в хранилище нет, присваиваем дефолтные значения
    activities.value = state.activities || activities.value;
}

// загружаем начальное состояние приложения
loadState();

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState()
})

createApp(App).mount('#app')
