module.exports = async () => {
  const Searches = require("../models/search")
  const Telegram = require('telegraf/telegram')

  const telegram = new Telegram("AAF3GEyemAyeIsZSoVatBnxrJgEWOVfevog")

  const latestSearches = await Searches.findLatest()
  
  telegram.sendMessage(latestSearches[0].user.messengerId, "Was geht aller").catch(err => console.log(err))
  return latestSearches.length > 0 ? true : false
}