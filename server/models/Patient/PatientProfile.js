import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  name: String,
  pronouns: String,
  age: Number,
  gender: String,
  contactNumber: String,
  email: String,
  location: String,
  occupation: String,
  familyDoctor: String,
  doctorSpeciality: String,
  insuranceInfo: {
    provider: String,
    policyNumber: String,
  },
  appointmentDates: [Date],
});

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);
export default PatientProfile;