module.exports = async () => {
  const Searches = require("../models/search")
  const Telegram = require('telegraf/telegram')

  const telegram = new Telegram("AAF3GEyemAyeIsZSoVatBnxrJgEWOVfevog")

  const latestSearches = await Searches.findLatest()
  console.log(latestSearches[0].user.messengerId)

  telegram.sendMessage(latestSearches[0].user.messengerId, "Was geht aller").catch(err => console.log(err))
  return latestSearches.length > 0 ? true : false
}