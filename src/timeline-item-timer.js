import { MILLISECONDS_IN_SECOND } from '@/constants'
import { ref } from 'vue'
import { activeTimelineItem, updateTimelineItem } from '@/timeline-items'

// глобальный таймер
const timelineItemTimer = ref(false)

// запуск глобального таймера timelineItemTimer
export function startTimelineItemTimer(timelineItem) {
  timelineItem = timelineItem ?? activeTimelineItem.value

  updateTimelineItem(timelineItem, {
    isActive: true
  })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer() {
  updateTimelineItem(activeTimelineItem.value, {
    isActive: false
  })

  clearInterval(timelineItemTimer.value)

  timelineItemTimer.value = false
}

export function resetTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, {
    activitySeconds: 0
  })

  if (activeTimelineItem.value) {
    stopTimelineItemTimer()
  }
}
