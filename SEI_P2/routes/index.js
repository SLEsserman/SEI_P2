var express = require("express")
var moment = require("moment")
var router = express.Router()
const passport = require("passport")
const ensureLoggedIn = require("../config/ensureLoggedIn")

// This app has no "home" page, but your projects should 😀
router.get("/", function (req, res, next) {
  res.render("index", { title: "Workout planner" })
})

router.get("/profile", ensureLoggedIn, function (req, res, next) {
  let dob = "Not set"
  if (req.user.dateOfBirth) {
    dob = moment(req.user.dateOfBirth).fromNow(true)
  }
  req.user.dob = dob
  res.render("profile", {
    user: req.user,
    title: req.user.name + "'s  Profile",
  })
})

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate(
    // Which passport strategy is being used?
    "google",
    {
      // Requesting the user's profile and email
      scope: ["profile", "email"],
      // Optionally force pick account every time
      prompt: "select_account",
    }
  )
)

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
)

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect("/")
  })
})

module.exports = router
