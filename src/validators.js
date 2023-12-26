import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from "@/constants";

function isNull(value) {
    return value === null;
}

function isNumber(value) {
    return typeof value === 'number';
}

function isString(value) {
    return typeof value === 'string';
}

function isBetween(value, start, end) {
    return value >= start && value <= end
}

function isSelectOptionValid({ value, label}) {
    return (isNumber(value) || isNotEmptyString(value))
    && isNotEmptyString(label)
}

function isNotEmptyString(value) {
    return isString(value) && value.length > 0
}

export function isUndefined(value) {
    return value === undefined;
}

export function isHourValid(hour) {
    return isNumber(hour)
        && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);
}


export function isPageValid (currentPage) {
    return Object.keys(NAV_ITEMS).includes(currentPage);
}

export function isTimelineItemValid({ hour }) {
    return isHourValid(hour);
}

export function validateSelectOptions(options) {
    return options.every(isSelectOptionValid);
}

export function validateTimelineItems(timelineItems) {
    return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(property) {
    return isUndefined(property) || isNull(property);
}

export function isNumberOrNull(property) {
    return isNumber(property) || isNull(property);
}

export function isActivityValid({ id, name, secondsToComplete}) {
    return [
        isNotEmptyString(id),
        isNotEmptyString(name),
        isNumber(secondsToComplete),
    ].every(Boolean);
}

export function validateActivities(activities) {
    return activities.every(isActivityValid);
}

export function isButtonTypeValid(type) {
    return BUTTON_TYPES.includes(type);
}
