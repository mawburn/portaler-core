import fetchServer from './fetchServer'

let roles: string[] = []

const unattachedRoles = (
  action?: 'remove' | 'add',
  update?: string
): string[] => {
  if (action === 'add' && update) {
    roles.push(update)
  } else if (action === 'remove' && update) {
    const index = roles.indexOf(update)

    roles = roles.splice(index, 1)
  }

  return roles
}

export const loadRoles = async () => {
  const res = await fetchServer('serverRoles', 'GET')

  if (res.ok) {
    const newRoles = await res.json()

    roles = newRoles
  }
}

export default unattachedRoles
