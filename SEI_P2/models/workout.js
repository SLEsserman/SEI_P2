const mongoose = require("mongoose")
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

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

const exerciseSchema = new Schema(
  {
    name: String,
    timeAlloc: {
      type: Number, // seconds
    },
    rep: Number,
  },
  { timestamps: true }
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true }, // this will be the workout
    workoutRating: {
      type: String,
      enum: ["Beginner", "Intermidate", "Hard", "Master"],
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

// Compile the schema into a model and export it
module.exports = mongoose.model("Workout", workoutSchema)
