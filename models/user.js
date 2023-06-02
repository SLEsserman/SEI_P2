const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define the user schema using the Schema constructor
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
    //made reference to workout plan
    goal: {
      type: String,
      enum: ["Improve Shape", "Get Faster", "Lean & Tone"],
    },
  },
  {
    timestamps: true,
  }
)

// Create and export the User model based on the user schema
module.exports = mongoose.model("User", userSchema)
