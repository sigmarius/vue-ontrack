import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR
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
