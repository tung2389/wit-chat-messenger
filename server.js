const express = require("express");
const app = express();
//require('dotenv').config();

// Import routes
const webhook = require('./routes/webhook')

app.use("/webhook", webhook)

app.listen(process.env.PORT, function() {
  console.log(`Server is running at port ${process.env.PORT}`);
});