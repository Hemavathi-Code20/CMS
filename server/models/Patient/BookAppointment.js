import mongoose from 'mongoose';

const BookAppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const BookAppointment = mongoose.model("BookAppointment", BookAppointmentSchema);
export default BookAppointment;