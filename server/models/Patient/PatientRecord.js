import mongoose from "mongoose";

const patientRecordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  fullName: { type: String, required: true },
  treatmentPlan: String,
  labTestResults: { type: String },
  xRayImages: { type: String },
  visitDates: [{ date: Date, reason: String }],
  doctorsNotes: String,
});

const PatientRecord = mongoose.model("PatientRecord", patientRecordSchema);
export default PatientRecord;