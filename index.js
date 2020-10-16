const Telegraf = require("telegraf")
const session = require('telegraf/session')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const routes = require("./routes/index")
const messageHandling = require("./controllers/messageHandling")
const getUser = require("./controllers/getUser")
const sendReply = require("./controllers/sendReply")
const writeDb = require("./controllers/writeDb")

mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: "recommendations",
  user: "herrids",
  pass: "RCV4AQ6rUhmej4u",
  useFindAndModify: false
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bot = new Telegraf('708938129:AAF3GEyemAyeIsZSoVatBnxrJgEWOVfevog')

app.use(routes)
app.listen(3456, () => {
  console.log('app listening on port 3456!')
})

bot.catch((err) => console.log(err))
bot.use(session())
bot.use(getUser)
messageHandling(bot)
bot.use(sendReply)
bot.use(writeDb)
bot.launch()