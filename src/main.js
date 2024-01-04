import '@/assets/main.css'
import { loadState, saveState} from "@/storage"
import { createApp } from 'vue'
import App from './App.vue'

// загружаем начальное состояние приложения
loadState();

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState()
})

createApp(App).mount('#app')
