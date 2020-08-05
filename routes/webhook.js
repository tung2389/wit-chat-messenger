const express = require('express')
const Wit = require("node-wit").Wit;
const log = require("node-wit").log;

const sendMessage = require('../controller/message.js')
const witHandler = require('../controller/wit.js')

const WIT_TOKEN = process.env.WIT_TOKEN;
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

const router = express.Router()
const wit = new Wit({
  accessToken: WIT_TOKEN,
  logger: new log.Logger(log.INFO)
});

router.get('/', (req, res) => {
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

    // Checks the mode and token sent is correct
  if (mode === 'subscribe' && 
      token === FB_VERIFY_TOKEN
     ) {

    // Responds with the challenge token from the request
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);

  } else {
    // Responds with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);      
  }
});

router.post("/", (req, res) => {
  // Parse the Messenger payload
  // See the Webhook reference
  // https://developers.facebook.com/docs/messenger-platform/webhook-reference
  const data = req.body;

  if (data.object === "page") {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && !event.message.is_echo) {
          // We got a new message
          // We retrieve the Facebook user ID of the sender
          const senderId = event.sender.id;

          // We could retrieve the user's current session, or create one if it doesn't exist
          // This is useful if we want our bot to figure out the conversation history
          // const sessionId = findOrCreateSession(sender);

          // We retrieve the message content
          const { text, attachments } = event.message;

          if (attachments) {
            // We received an attachment
            // Let's reply with an automatic message
            sendMessage(
              senderId,
              "Sorry, I can only process text messages for now."
            ).catch(console.error);
          } else if (text) {
            // We received a text message
            // Let's run /message on the text to extract some entities, intents and traits
            wit
              .message(text)
              .then(res => witHandler.responseFromWit(res))
              .then(msg => {
                sendMessage(senderId, msg);
              })
              .catch(err => {
                console.error(
                  "Oops! Got an error from Wit: ",
                  err.stack || err
                );
              });
          }
        } else {
          console.log("received event", JSON.stringify(event));
        }
      });
    });
  }
  res.sendStatus(200);
});

module.exports = router
