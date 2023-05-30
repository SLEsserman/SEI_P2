var express = require("express")
const ensureLoggedIn = require("../config/ensureLoggedIn")
const User = require("../models/user")
var router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource")
})

router.put("/:id", ensureLoggedIn, async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.redirect("/profile")
})

module.exports = router
