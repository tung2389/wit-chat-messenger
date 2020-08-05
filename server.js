const express = require("express");
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
  res.status(200).send("hello world")
})

app.listen(process.env.PORT, function() {
  console.log(`Server is running at port ${process.env.PORT}`);
});

