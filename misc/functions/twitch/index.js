const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  try {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${process.env.TWITCH_KEY}`)
    headers.append('Client-Id', process.env.TWITCH_CLIENT)

    const res = await fetch(
      'https://api.twitch.tv/helix/search/channels?query=hypnocode',
      {
        headers,
      }
    )

    const json = await res.json()

    const channel = json.find((c) => c.id === '141531232')

    return {
      statusCode: 200,
      body: JSON.stringify({ live: channel.is_live }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
