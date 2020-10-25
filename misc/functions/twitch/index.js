const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  try {
    const res = await fetch(
      'https://api.twitch.tv/helix/search/channels?query=hypnocode',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.TWITCH_KEY}`,
          'Client-Id': process.env.TWITCH_CLIENT,
        },
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
