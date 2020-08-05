const express = require("express");
const http = require('http');
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
  res.sendStatus(200);
})

app.listen(process.env.PORT, function() {
  console.log(`Server is running at port ${process.env.PORT}`);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 295555);

