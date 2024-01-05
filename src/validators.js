import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants'
import { ICONS } from '@/icons'

function isString(value) {
  return typeof value === 'string'
}

function isBetween(value, start, end) {
  return value >= start && value <= end
}

function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

function isNumber(value) {
  return typeof value === 'number'
}

function isNumberOrNull(property) {
  return isNumber(property) || isNull(property)
}

function isUndefined(value) {
  return value === undefined
}

export function isNull(value) {
  return value === null
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isPageValid(currentPage) {
  // если какой-либо элемент из массива NAV_ITEMS содержит текущую страницу
  // => return true
  return NAV_ITEMS.some((navItem) => navItem.page === currentPage)
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isUndefinedOrNull(property) {
  return isUndefined(property) || isNull(property)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }

  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}

export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
}

export function isIconValid(icon) {
  return Object.keys(ICONS).includes(icon)
}
