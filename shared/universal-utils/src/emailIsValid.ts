/**
 * Just validates email format
 * @param  email
 * @returns boolean
 */
export const emailIsValid = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
