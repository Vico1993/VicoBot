const http = require('http')
const config = require( './config.js' )
const Bot = require('messenger-bot')

let bot = new Bot({
  token: config.token,
  verify: config.verify,
  app_secret: config.secret
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    console.log( `Il y a ${profile.first_name} ${profile.last_name} qui me parle... Oulah, je comprend rien, je vais me coucher` );

    var messageData = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "rift",
              subtitle: "Next-generation virtual reality",
              item_url: "https://www.oculus.com/en-us/rift/",
              image_url: "http://messengerdemo.parseapp.com/img/rift.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/rift/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for first bubble",
              }],
            }, {
              title: "touch",
              subtitle: "Your Hands, Now in VR",
              item_url: "https://www.oculus.com/en-us/touch/",
              image_url: "http://messengerdemo.parseapp.com/img/touch.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/touch/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for second bubble",
              }]
            }]
          }
        };

    bot.sendMessage( payload.sender.id, messageData,  ( err, info ) => {
      if (err) throw err
    })

    // reply({text} , (err) => {
    //   if (err) throw err
    //
    //   // console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    // })
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
