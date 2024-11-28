import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String,
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;