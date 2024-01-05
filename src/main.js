import '@/assets/main.css'
import { loadState, saveState } from '@/storage'
import { activeTimelineItem, startTimelineItemTimer } from '@/timeline-items'
import { createApp } from 'vue'
import App from './App.vue'

// загружаем начальное состояние приложения
loadState()

if (activeTimelineItem.value) {
  // запускаем глобальный таймер
  startTimelineItemTimer(activeTimelineItem.value)
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
