const foursquareHandling = require("./foursquareHandling")
const addKeyboardMarkup = require("../util/addKeyboardMarkup")

module.exports = async (ctx, next) => {
  if(!ctx.session.search.category) ctx.reply("Wo möchtest du hin? Sende uns ein passendes Emoji", 
  addKeyboardMarkup("category"))
  else if(!ctx.session.search.location) ctx.reply("Bitte sende uns deine Location", 
  addKeyboardMarkup("location"));
  else if (ctx.session.search.rating === null) ctx.reply("Wie hat dir der Besuch gefallen? Schick mir einfach ein Emoji, der deine Menung am besten beschreibt", 
  addKeyboardMarkup("rating"));
  else if (ctx.session.search.rating != null) {
    ctx.reply("Danke für deine Bewertung. Wenn ich dir noch eine Empfehlung senden soll, schick mir einfach den passenden Emoji", 
    addKeyboardMarkup("category"))
  }
  else {
    const venue = await foursquareHandling.searchVenues(ctx.session.search);
    if (!venue || !venue[0])
      ctx.reply(
        `Leider haben wir ${ctx.session.search.index==0 ? "keinen passenden Ort": "keine weiteren Orte"} für ${ctx.session.search.category.emoji} gefunden. Probiere eine andere Kategorie`, 
        addKeyboardMarkup("category"));
    else {
      await ctx.replyWithLocation(venue[0].location.lat, venue[0].location.lng);
      await ctx.reply(ctx.session.search.index==0 ?"Schau, folgendes habe ich gefunden: " + venue[0].name: "Wie wäre es hiermit: " + venue[0].name, 
      addKeyboardMarkup("recommendation"));
      ctx.session.search.place = venue[1]
    }
  }
  console.log(ctx.session.search)
  next()
}