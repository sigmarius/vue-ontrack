import '@/assets/main.css'
import { loadState, saveState } from '@/storage'
import { findActiveTimelineItem, startTimelineItemTimer } from '@/timeline-items'
import { createApp } from 'vue'
import App from './App.vue'

// загружаем начальное состояние приложения
loadState()

const activeTimelineItem = findActiveTimelineItem();

if (activeTimelineItem) {
  // запускаем глобальный таймер
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
