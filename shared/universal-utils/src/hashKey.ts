const regex = new RegExp(/[=|+|\\/]/g)

/**
 * Takes values and returns a hash string that will be unique
 * to the values passed but will return the same hash if called
 * with the same values more than once
 * @param values string or number to hash
 * @returns hash string unique to the values passed in
 */
export const hashKey = (...values: (string | number)[]): string =>
  btoa(values.join('')).replace(regex, '')

/**
 * Takes values and returns a hash string that will be unique
 * to the values passed but will return the same hash if called
 * with the same values more than once
 * @param btoa pass in the missing bota function in NodeJS
 * @param values string or number to hash
 * @returns hash string unique to the values passed in
 */
export const hashKeyNode = (
  btoa: Function,
  ...values: (string | number)[]
): string => btoa(values.join('')).replace(regex, '')
