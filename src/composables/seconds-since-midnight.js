import { computed, ref, watchEffect, onActivated, onDeactivated } from "vue";
import {
  HUNDRED_PERCENT,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND
} from "@/constants";

function calculateSecondsSinceMidnight() {
  const now = new Date();

  return SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours()
    + SECONDS_IN_MINUTE * now.getMinutes()
    + now.getSeconds();
}

export function useSecondsSinceMidnight() {
  const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

  const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
  )

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  let timer = null
  // индикатор запускается только при переключении на страницу
  onActivated(() => {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()

    timer = setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECOND)
  })

  // при переходе на другую страницу останавливаем индикатор
  onDeactivated(() => clearInterval(timer))

  return {
    secondsSinceMidnightInPercentage
  }
}
