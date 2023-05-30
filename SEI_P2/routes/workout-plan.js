var express = require("express")
const ensureLoggedIn = require("../config/ensureLoggedIn")
const WorkoutPlan = require("../models/workoutplan")
var router = express.Router()

/* GET users listing. */
router.get("/", ensureLoggedIn, function (req, res, next) {
  // Render the "workoutplan/index" view with the title as the user's name followed by "'s Workout plans"
  res.render("workoutplan/index", {
    title: req.user.name + "'s Workout plans",
  })
})

router.get("/new", ensureLoggedIn, function (req, res, next) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"
  res.render("workoutplan/new", {
    title: "Create Workout plans",
  })
})

module.exports = router
