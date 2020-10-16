const Message = require("../models/message")
const Search = require("../models/search")

module.exports = async (ctx, next) => {
  const telegramMessage = ctx.message.text ? ctx.message.text : 
  ctx.message.location ? ctx.message.location : 
  ctx.message.sticker ? ctx.message.sticker.emoji : "unknown"

  Message.save(telegramMessage, ctx.session.user._id)
  Search.updateOrCreate(ctx.session.user, ctx.session.search)
  ctx.session.search.rating ? ctx.session.search = null : null
}