import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  HOURS_IN_DAY
} from "@/constants";

export function normalizePageHash() {
  const hash = window.location.hash.slice(1);

  if (
    Object.keys([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS]).includes(hash)
  ) {
    return hash;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

export function generateTimelineItems() {
  const TIMELINE_ITEMS = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    TIMELINE_ITEMS.push({ hour });
  }

  return TIMELINE_ITEMS;
}
