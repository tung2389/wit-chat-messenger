const express = require("express");
const https = require('https');
const app = express();
const bodyParser = require('body-parser')
//require('dotenv').config();

// Import routes
const webhook = require('./routes/webhook')

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/webhook", webhook)

app.get("/", (req, res) => {
  res.status(200).send('The server is activated!. Now you can use my chat bot');
})

app.listen(process.env.PORT, function() {
  console.log(`Server is running at port ${process.env.PORT}`);
});

setInterval(() => {
  https.get(`https://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 290000)