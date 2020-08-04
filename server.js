const express = require("express");
const app = express();
//require('dotenv').config();

app.get('/webhook', (req, res) => {
  let FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
  
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

app.listen(process.env.PORT, function() {
  console.log(`Server is running at port ${process.env.PORT}`);
});