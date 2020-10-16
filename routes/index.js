const { Router } = require("express")
const sendReminder = require("../controllers/sendReminder")

const router  = new Router()

router.get("/checkSearches", (req, res, next) =>{
  res.send(sendReminder())
})

module.exports = router