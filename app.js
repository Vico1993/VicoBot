const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAKj8y1NHI4BACBZAFuBK6AHez7AGz4fbQUwxCTZAcGLopBwhl7HAAiNnMO64AtywNB0PiN5XOJedij2kPGQMhhYwhwEgx7PhTSN7TN8qOgV2wsZAd03IFl92ZCVCYqXFZBlULZBYAlTTHQHbfi9wMEY9ZCPUTfjKKULtz0pI6qiAZDZD',
  verify: 'victor_bot',
  app_secret: 'e28cc2d2c8c4dc81d21811e4f13ca34b'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  console.log( text );
  console.log( 'toto' );

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
