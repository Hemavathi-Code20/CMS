const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  appointmentType: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentStatus: { type: String, default: 'Upcoming' }, // Possible values: Upcoming, Completed, Canceled
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
