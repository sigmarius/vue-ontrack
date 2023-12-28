import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
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

export function generateTimelineItems() {
  const timelineItems = [];

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({
      hour,
      activityId: null,
      activitySeconds: 0
     });
  }

  return timelineItems;
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
