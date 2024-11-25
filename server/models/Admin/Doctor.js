import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  profilePicture: { type: String, required: true },
  doctorId: { type: String, unique: true },
  fullName: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Example dropdown options for gender
  },
  contactNumber: String,
  department: {
    type: String,
    enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'], // Example department options
  },
  specialization: {
    type: String,
    enum: ['Surgery', 'General Practice', 'Dermatology', 'Dentistry', 'Psychiatry'], // Example specialization options
  },
  qualification: String,
  yearsOfExperience: Number,
  email: { type: String, unique: true },
  availability: {
    type: String,
    enum: ['Full-time', 'Part-time', 'On-call'], // Example availability options
  },
  consultationMethod: {
    type: String,
    enum: ['In-person', 'Online'], // Example consultation method options
  },
  doctorsFee: Number,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
