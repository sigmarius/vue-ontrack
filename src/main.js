import '@/assets/main.css'
import { syncState } from '@/storage'
import { createApp } from 'vue'
import App from './App.vue'
import { startCurrentDateTimer } from '@/time'

syncState()

startCurrentDateTimer()

document.addEventListener('visibilitychange', () => {
  syncState(document.visibilityState === 'visible')
})

createApp(App).mount('#app')
