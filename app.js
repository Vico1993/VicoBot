const http = require('http')
const config = require( './config.js' )
const Bot = require('messenger-bot')

let bot = new Bot({
  token: config.token,
  verify: config.verify,
  app_secret: config.secret
})

bot.setGetStartedButton( 'Cool' );

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    console.log( `Il y a ${profile.first_name} ${profile.last_name} qui me parle... Oulah, je comprend rien, je vais me coucher` );

    reply({ text }, (err) => {
      if (err) throw err

      // console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
