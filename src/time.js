import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR
} from '@/constants'

// дата, соответствующая прошедшей полночи
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

let currentDateTimer = null

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startCurrentDateTimer() {
  now.value = today()

  currentDateTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  clearInterval(currentDateTimer)
}

export function today() {
    const today = new Date()

    // временно, для тестирования
    // today.setHours(0, 0)

    return today
  }

  export function tomorrow() {
    const tomorrow = today()
    tomorrow.setHours(tomorrow.getDate() + 1)

    return tomorrow
  }

export function isToday(date) {
    return date.toDateString() === today().toDateString()
}

// вычисляет окончание часа, при котором мы начали замерять время для активности
export function endOfHour(date) {
  const endOfHour = new Date(date);

  // добавляем 1 час к дате последнего закрытия приложения
  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND);

  // получаем дату конца того часа, при котором мы начали замерять активность
  endOfHour.setMinutes(0, 0, 0);

  return endOfHour;
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}
