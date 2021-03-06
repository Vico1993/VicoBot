var fs = require('fs')
const http = require('http')
const config = require( './config.js' )
const Bot = require('messenger-bot')

var commande = JSON.parse(fs.readFileSync('dialogue.json', 'utf8'))

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

    // var messageData = {
    //     attachment: {
    //       type: "template",
    //       payload: {
    //         template_type: "generic",
    //         elements: [{
    //           title: "rift",
    //           subtitle: "Next-generation virtual reality",
    //           item_url: "https://www.oculus.com/en-us/rift/",
    //           image_url: "http://messengerdemo.parseapp.com/img/rift.png",
    //           buttons: [{
    //             type: "web_url",
    //             url: "https://www.oculus.com/en-us/rift/",
    //             title: "Open Web URL"
    //           }, {
    //             type: "postback",
    //             title: "Call Postback",
    //             payload: "Payload for first bubble",
    //           }],
    //         }, {
    //           title: "touch",
    //           subtitle: "Your Hands, Now in VR",
    //           item_url: "https://www.oculus.com/en-us/touch/",
    //           image_url: "http://messengerdemo.parseapp.com/img/touch.png",
    //           buttons: [{
    //             type: "web_url",
    //             url: "https://www.oculus.com/en-us/touch/",
    //             title: "Open Web URL"
    //           }, {
    //             type: "postback",
    //             title: "Call Postback",
    //             payload: "Payload for second bubble",
    //           }]
    //         }]
    //       }
    //     }
    //   };

    var tmp = "aurevoir"

    commande[ tmp ][ "messages" ].map( function( message ) {
      bot.sendMessage( payload.sender.id, message,  ( err, info ) => {
        if (err) {
          console.log( err )
        }
      })
    })
  })
})

bot.on('postback', (payload, reply, actions) => {
  reply({ text: 'hey!'}, (err, info) => {})

  console.log( "PostBack" );
  console.log( actions );
  console.log( payload );
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
