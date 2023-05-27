const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  dateOfBirth: Date,
  weight: Number,
  height: Number,
  workouts: [
    {

    }
  ],
  goal: {
    type: String,
    enum: [
      "improve shape",
      "get faster",
      "lean and tone"
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);