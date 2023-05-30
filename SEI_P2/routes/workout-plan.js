var express = require("express")
const ensureLoggedIn = require("../config/ensureLoggedIn")
const WorkoutPlan = require("../models/workoutplan")
var router = express.Router()

/* GET users listing. */
router.get("/", ensureLoggedIn, function (req, res, next) {
  res.render("workoutplan/index", {
    title: req.user.name + "'s Workout plans",
  })
})

router.get("/new", ensureLoggedIn, function (req, res, next) {
  res.render("workoutplan/new", {
    title: "Create Workout plans",
  })
})

module.exports = router
