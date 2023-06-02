var express = require("express")
const ensureLoggedIn = require("../config/ensureLoggedIn")
const WorkoutPlan = require("../models/workoutplan")
var router = express.Router()

/* GET users listing. */
router.get("/", ensureLoggedIn, async function (req, res, next) {
  // Render the "workoutplan/index" view with the title as the user's name followed by "'s Workout plans"
  const plans = await WorkoutPlan.find({ owner: req.user._id })
  res.render("workoutplan/index", {
    title: req.user.name + "'s Workout plans",
    plans,
  })
})

router.post("/", ensureLoggedIn, async function (req, res) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"

  let workoutPlan = await WorkoutPlan.create({
    ...req.body,
    owner: req.user._id,
  })
  res.redirect("/workout-plan/" + workoutPlan._id)
})

router.get("/new", ensureLoggedIn, function (req, res, next) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"
  res.render("workoutplan/new", {
    title: "Create Workout plans",
  })
})

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"
  let planId = req.params.id
  let plan = await WorkoutPlan.findById(planId)
  console.log("plan", plan)
  res.render("workoutplan/update", {
    title: "Add Exercise to Workout plans",
    plan,
  })
})

router.put("/:id/exercise", ensureLoggedIn, async function (req, res) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"
  let planId = req.params.id

  let workoutPlan = await WorkoutPlan.findById(planId)
  workoutPlan.exercises = [...workoutPlan.exercises, req.body]
  await workoutPlan.save()

  res.redirect("/workout-plan/" + workoutPlan._id)
})

router.delete("/:id", ensureLoggedIn, async function (req, res) {
  // Render the "workoutplan/new" view with the title "Create Workout plans"
  let planId = req.params.id
  await WorkoutPlan.findByIdAndDelete(planId)

  res.redirect("/workout-plan/")
})

router.delete(
  "/:id/exercise/:exerciseId",
  ensureLoggedIn,
  async function (req, res) {
    // Render the "workoutplan/new" view with the title "Create Workout plans"
    let planId = req.params.id

    let workoutPlan = await WorkoutPlan.findById(planId)

    let newExercises = workoutPlan.exercises.filter(
      (exercise) => exercise._id != req.params.exerciseId
    )


    workoutPlan.exercises = newExercises
    await workoutPlan.save()

    res.redirect("/workout-plan/" + workoutPlan._id)
  }
)

module.exports = router
