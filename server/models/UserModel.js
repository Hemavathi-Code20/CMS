const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  profilePicture: String, // File path of the profile picture
  fullName: String,
  gender: String,
  age: Number,
  contactNumber: String,
  emailAddress: String,
  joinedDate: Date,
  role: String,
  yearsOfExperience: Number,
  category: String,
  specialization: String,
  clinicTimings: String,
  consultationFee: Number,
  workSchedule: String,
});

module.exports = mongoose.model('User', userSchema);
