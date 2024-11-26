import mongoose from "mongoose";

const FixAppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Confirmed, Rescheduled, Canceled
});

const FixAppointment = mongoose.model("FixAppointment", FixAppointmentSchema);
export default FixAppointment;
