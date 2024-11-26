import mongoose from "mongoose";

const doctorRecordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'], required: true },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
  knownAllergies: [{ type: String }],
  chronicConditions: [{ type: String }],
  previousSurgeries: { type: String },
  vaccinationHistory: { type: String },
  numberOfVisits: { type: Number },
  visitDates: [{
    date: { type: Date },
    reason: { type: String }
  }],
  treatmentPlan: { type: String },
  labTestResults: { type: String },
  xRayImages: { type: String },
  height: { type: Number },
  weight: { type: Number },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  doctorsNotes: { type: String },
});

const DoctorRecord= mongoose.model("DoctorRecord", doctorRecordSchema);
export default DoctorRecord;