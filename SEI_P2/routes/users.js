var express = require("express")
const ensureLoggedIn = require("../config/ensureLoggedIn")
const User = require("../models/user")
var router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  // Respond with a string message "respond with a resource"
  res.send("respond with a resource")
})

router.put("/:id", ensureLoggedIn, async function (req, res) {
  // Update the user with the provided ID using the request body data
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  // Redirect to the profile page after the user update
  res.redirect("/profile")
})

module.exports = router
