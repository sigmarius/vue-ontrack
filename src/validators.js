import { NAV_ITEMS, HOURS_IN_DAY } from "@/constants";

export function isPageValid (currentPage) {
    return Object.keys(NAV_ITEMS).includes(currentPage);
}

export function isTimelineItemValid({ hour }) {
    return typeof hour === "number"
        && hour >= 0 && hour < HOURS_IN_DAY;
}
