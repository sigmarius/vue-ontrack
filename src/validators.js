import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from "@/constants";

function isSelectOptionValid({ value, label}) {
    return typeof value === 'number' && typeof label === 'string'
}

export function isPageValid (currentPage) {
    return Object.keys(NAV_ITEMS).includes(currentPage);
}

export function isTimelineItemValid({ hour }) {
    return typeof hour === "number"
        && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY;
}

export function validateSelectOptions(options) {
    return options.every(isSelectOptionValid);
}

export function validateTimelineItems(timelineItems) {
    return timelineItems.every(isTimelineItemValid)
}
