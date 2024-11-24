import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  profilePicture: String,
  doctorId: { type: String, unique: true },
  fullName: String,
  gender: String,
  contactNumber: String,
  specialization: String,
  qualification: String,
  yearsOfExperience: Number,
  email: { type: String, unique: true },
  availability: String,
  consultationMethod: String,
  availabilityStatus: String,
  doctorsFee: Number,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
