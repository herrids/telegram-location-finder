const checkEmoji = require("../util/checkEmoji")
const Category = require("../models/category")
const addKeyboardMarkup = require("../util/addKeyboardMarkup")

module.exports = async bot => {

  let triggered = false

  bot.start((ctx, next) => {
    ctx.reply("Willkommen bei Nestbreak. Egal was du suchst ich finde den passenden Ort. Sende mir einfach einen Emoji", addKeyboardMarkup("category"))
  })
  
  bot.hears("Ort bewerten", (ctx, next) => {
    ctx.session.search.rating = null
    triggered = true
    next()
  })

  bot.hears("Anderer Vorschlag", async (ctx, next) => {
    ctx.session.search.index++
    triggered = true
    next()
  })

  bot.hears("Andere Kategorie", async (ctx, next) => {
    if(ctx.session.search.added < (Date.now()-36000)) {
      ctx.session.search = {added: Date.now()}
    }
    else {
      ctx.session.search.category = ""
      ctx.session.search.added = Date.now()
    }
    triggered = true
    next()
  })

  bot.on("sticker", async (ctx, next) => {
    if(ctx.session.search.rating === null) {
      ctx.session.search.rating = ctx.message.sticker.emoji
      next()
      return
    }
    
    ctx.session.search.added < (Date.now()-36000) ? ctx.session.search = {added: Date.now()} : null
    
    await Category.find(ctx.message.sticker.emoji).then(category => {
      if(category) {
        ctx.session.search.category = category
        ctx.session.search.index = 0
      }
    })

    next()
  })

  bot.on("text", async (ctx, next) => {
    if(triggered == true) {
      triggered = false
      next()
      return
    }

    if(ctx.session.search.rating === null) {
      ctx.session.search.rating = ctx.message.text
      next()
      return
    }

    if(!checkEmoji(ctx.message.text)){
      ctx.reply("Sende mir bitte ein Emoji")
      return
    }

    ctx.session.search.added < (Date.now()-36000) ? ctx.session.search = {added: Date.now()} : null

    await Category.find(ctx.message.text).then(category => {
      if(category) {
        ctx.session.search.category = category
        ctx.session.search.index = 0
      }
    })

    next()
  })

  bot.on("location", (ctx, next) => {
    ctx.session.search.added < (Date.now()-36000) ? ctx.session.search = {added: Date.now()} : null
    ctx.session.search.location = ctx.message.location
    next()
  })
};
