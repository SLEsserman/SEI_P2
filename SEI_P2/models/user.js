const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    dateOfBirth: Date,
    weight: Number,
    height: String,
    workouts: [{}],
    goal: {
      type: String,
      enum: ["Improve Shape", "Get Faster", "Lean & Tone"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
