import { Message, Role } from 'discord.js'

import fetchServer from '../../fetchServer'
import unattachedRoles from '../../unattachedRoles'

const messageHandler = async (msg: Message) => {
  if (
    msg.type === 'DEFAULT' &&
    msg.guild?.id &&
    msg.channel &&
    msg.member &&
    msg.member.roles.cache.size > 0 &&
    msg.content.startsWith('-portaler ') &&
    Array.from(msg.member.roles.cache.values()).some((r: Role) =>
      unattachedRoles().includes(r.id)
    )
  ) {
    try {
      // Handle add servers, if more services are offered in the future split this into multiple functions
      // the check above should be good until we add admin role
      const discordId = msg.guild.id

      const contentItems = msg.content.split(' ')

      if (contentItems.length < 5) {
        throw new Error('Missing parameters')
      }

      const keyIndex = contentItems.indexOf('-k')

      if (keyIndex === -1) {
        throw new Error('Portaler Error: Missing key parameter')
      }

      const key = contentItems[keyIndex + 1]

      if (key.length < 5 || key.length > 10) {
        throw new Error('Portaler Error: Key invalid')
      }

      const domainIndex = contentItems.indexOf('-d')

      if (domainIndex === -1) {
        throw new Error('Portaler Error: Missing domain parameter')
      }

      const subdomain = contentItems[domainIndex + 1]

      if (!subdomain) {
        throw new Error('Portaler Error: Invalid subdomain')
      }

      const resStatus = await fetchServer(
        'addServer',
        'POST',
        JSON.stringify({ discordId, subdomain, key })
      )

      if (resStatus.ok) {
        msg.channel.send(
          `Server created, you can now login: https://${subdomain}.portaler.zone/`
        )

        const role = Array.from(
          msg.member.roles.cache.values()
        ).find((r: Role) => unattachedRoles().find((ur) => ur === r.id))

        unattachedRoles('remove', role?.id)
      } else {
        msg.channel.send(
          'Error attaching server, please check your parameters and try again. It should be in the format of `-portaler -k [your_key] -d [your_subdomain]`'
        )
      }
    } catch (err) {
      if (err.message && err.message.startsWith('Portaler Error: ')) {
        msg.channel.send(err.message.replace('Portaler', ''))
      }
    }
  }
}

export default messageHandler
