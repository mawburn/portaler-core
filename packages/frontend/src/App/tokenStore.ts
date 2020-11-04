export const BAD_PASS = '🙅‍♀️bad password🤦‍♂️'

const tokenStore = (): string => {
  const token = window.localStorage.getItem('token')

  if (token === null) {
    return BAD_PASS
  }

  return token
}

export default tokenStore
