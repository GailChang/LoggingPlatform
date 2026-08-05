export function hasValue(value: number | string | undefined | null) {
  return value !== undefined && value !== null
}
export function hasValueString(value: number | string | undefined | null) {
  return hasValue(value) && typeof value === 'string' && value.trim() !== ''
}
export function hasValueNumber(value: number | string | undefined | null) {
  return hasValue(value) && typeof value === 'number'
}
