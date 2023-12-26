import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  SECONDS_IN_HOUR
} from "@/constants";
import { isPageValid } from "@/validators";

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

export function generateTimelineItems() {
  const TIMELINE_ITEMS = [];

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    TIMELINE_ITEMS.push({ hour });
  }

  return TIMELINE_ITEMS;
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
  return [
    {
      id: id(),
      name: 'Coding',
      secondsToComplete: 0 * SECONDS_IN_HOUR
    },
    {
      id: id(),
      name: 'Training',
      secondsToComplete: 1 * SECONDS_IN_HOUR
    },
    {
      id: id(),
      name: 'Reading',
      secondsToComplete: 2 * SECONDS_IN_HOUR
    }
  ]
}
