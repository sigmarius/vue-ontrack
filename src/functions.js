import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND
} from "@/constants";
import { isPageValid, isNull } from "@/validators";

function generatePeriodSelectOptionsLabel(period) {
  // получаем количество часов в переменной
  const hours = Math.floor(period / MINUTES_IN_HOUR).toString().padStart(2, 0);

  // получаем количество минут в переменной
  const minutes = (period % MINUTES_IN_HOUR).toString().padStart(2, 0);

  return `${hours}:${minutes}`;
}

export function normalizePageHash() {
  const page = window.location.hash.slice(1);

  if (
    isPageValid(page)
  ) {
    return page;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value)
    ? value
    : Number(value);
}

export function generateTimelineItems(activities) {
  return [...Array(HOURS_IN_DAY).keys()]
    .map(hour => ({
      hour,

      /** случайным образом рассчитываем activityId и activitySeconds */
      activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
      activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR
    }));
}

export function generateActivitySelectOptions(activities) {
  return activities.map(activity => ({
    label: activity.name,
    value: activity.id
  }));
}

export function id() {
  // указываем произвольную систему счистления для генерации случайных id
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generateActivities() {
  return ['Coding', 'Training', 'Reading']
  .map((name, idx) => ({
      id: id(),
      name,
      secondsToComplete: idx * SECONDS_IN_HOUR
  }))
}

export function generatePeriodSelectOptions(periodsInMinutes) {
  return periodsInMinutes.map(period => ({
        value: period * SECONDS_IN_MINUTE,
        label: generatePeriodSelectOptionsLabel(period)
      }
    ));
  }

  export function formatSeconds(seconds) {
  const date = new Date();

  // количество секунд не может быть отрицательным
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(":") - 2, utc.indexOf(":") + 6);
}
