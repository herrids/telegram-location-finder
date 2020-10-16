const User = require("../models/user");

module.exports = async (ctx, next) => {
  const firstname = ctx.from.first_name ?  ctx.from.first_name : null
  const lastname = ctx.from.last_name ?  ctx.from.last_name : null

  if(!ctx.session.user) ctx.session.user = await User.findOneOrCreate(ctx.from.id, firstname, lastname);
  if(!ctx.session.search) ctx.session.search = {added: Date.now()}
  next()
}