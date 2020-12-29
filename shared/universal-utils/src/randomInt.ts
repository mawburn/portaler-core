/**
 * Simple random number generator
 * @param  min
 * @param  max
 */
export const randomInt = (min: number, max: number) => {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1) + _min)
}
