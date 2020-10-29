/**
 * Takes values and returns a hash string that will be unique
 * to the values passed but will return the same hash if called
 * with the same values more than once
 * @param values string or number to hash
 * @returns hash string unique to the values passed in
 */
const hashKey = (...values: (string | number)[]): string =>
  btoa(values.join('')).replace(/[=|+|\\/]/g, '')

export default hashKey
