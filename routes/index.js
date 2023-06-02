var express = require("express")
var moment = require("moment")
var router = express.Router()
const passport = require("passport")
const ensureLoggedIn = require("../config/ensureLoggedIn")

// Route for the home page
router.get("/", function (req, res, next) {
  // Render the "index" view with the title "Workout planner"
  res.render("index", { title: "Workout planner" })
})

// Route for the profile page
router.get("/profile", ensureLoggedIn, function (req, res, next) {
  let dob = "Not set"
  if (req.user.dateOfBirth) {
    // Format the date of birth using Moment.js to display the time passed since the date
    dob = moment(req.user.dateOfBirth).fromNow(true)
  }
  // Add the formatted date of birth to the user object
  req.user.dob = dob
  // Render the "profile" view with the user object and the title as the user's name followed by "Profile"
  res.render("profile", {
    user: req.user,
    title: req.user.name + "'s Profile",
  })
})

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    // Requesting the user's profile and email
    scope: ["profile", "email"],
    // Optionally force picking an account every time
    prompt: "select_account",
  })
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
  // Call req.logout to log the user out
  req.logout(function () {
    // Redirect to the home page
    res.redirect("/")
  })
})

// Export the router
module.exports = router
