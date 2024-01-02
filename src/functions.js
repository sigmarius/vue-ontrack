import {
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
  LOW_PERCENT,
  MEDIUM_PERCENT,
  HUNDRED_PERCENT
} from '@/constants'
import { isNull } from '@/validators'

function generatePeriodSelectOptionsLabel(period) {
  // получаем количество часов в переменной
  const hours = Math.floor(period / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, 0)

  // получаем количество минут в переменной
  const minutes = (period % MINUTES_IN_HOUR).toString().padStart(2, 0)

  return `${hours}:${minutes}`
}

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : Number(value)
}

export function id() {
  // указываем произвольную систему счистления для генерации случайных id
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generatePeriodSelectOptions() {
  const periodsInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
  ]

  return periodsInMinutes.map((period) => ({
    value: period * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(period)
  }))
}

export function formatSecondsWithSign(seconds) {
  return `${seconds >= 0 ? "+" : "-"}${formatSeconds(seconds)}`;
}

export function formatSeconds(seconds) {
  const date = new Date()

  // количество секунд не может быть отрицательным
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)

  const utc = date.toUTCString()

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export function getCurrentHour() {
  return new Date().getHours()
}

export function getProgressColorClass(percentage) {
  if (percentage < LOW_PERCENT) {
    return 'bg-red-500'
  }

  if (percentage < MEDIUM_PERCENT) {
    return 'bg-yellow-500'
  }

  if (percentage < HUNDRED_PERCENT) {
    return 'bg-blue-500'
  }

  return 'bg-green-500'
}
