const mongoose = require("mongoose")
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

// Define the review schema
const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
)

// Define the exercise schema
const exerciseSchema = new Schema(
  {
    name: String,
    timeAlloc: {
      type: Number, // seconds
    },
    rep: Number,
    set: Number,
  },
  {
    timestamps: true,
  }
)

// Define the workout plan schema
const workoutPlanSchema = new Schema(
  {
    title: { type: String, required: true },
    reviews: [reviewSchema],
    exercises: [exerciseSchema],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //add reference to user model
    //of the models there are two of the same ones and i need to choose one that i want to keep and one to drop
  },
  {
    timestamps: true,
  }
)

// Compile the schema into a model named "WorkoutPlan" and export it
module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema)
