import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from "@/constants";

export function isPageValid (currentPage) {
    return Object.keys(NAV_ITEMS).includes(currentPage);
}

export function isTimelineItemValid({ hour }) {
    return typeof hour === "number"
        && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY;
}
