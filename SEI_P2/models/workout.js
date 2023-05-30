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
  },
  {
    timestamps: true,
  }
)

// Define the workout schema
const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    workoutRating: {
      type: String,
      enum: ["Beginner", "Intermediate", "Hard"],
    },
    muscleGroup: [
      {
        type: Schema.Types.ObjectId,
        ref: "muscleGroup",
      },
    ],
    workingoutToday: { type: Boolean, default: true },
    reviews: [reviewSchema],
    exercises: [exerciseSchema],
  },
  {
    timestamps: true,
  }
)

// Compile the schema into a model named "Workout" and export it
module.exports = mongoose.model("Workout", workoutSchema)
