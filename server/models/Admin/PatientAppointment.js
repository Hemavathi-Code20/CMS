import mongoose from 'mongoose';

const PatientAppointmentSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  location: { type: String },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  appointmentType: { type: String, required: true }, // in-person/online
  doctorName: { type: String, required: true },
  doctorspeciality: { type: String },
  appointmentStatus: { type: String, default: 'Upcoming' }, // Upcoming, Cancelled, Completed, Rescheduled
});

// Use export default for ES Modules syntax
export default mongoose.model('PatientAppointment', PatientAppointmentSchema);
