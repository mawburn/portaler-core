import { randomInt } from './randomInt'

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
  ''
)
/**
 * Generates a random alphanumeric key
 * @param  size? If no size is defined, it randomly generates a key from 5 to 10 characters
 * @returns string
 */
export const keyGenerator = (size?: number): string => {
  if (!size) {
    size = randomInt(5, 10)
  }

  const output: string[] = []

  for (let i = 0; i < size; i++) {
    const c = chars[randomInt(0, chars.length - 1)]
    output.push(c)
  }

  return output.join('')
}
