import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  profilePicture: { type: String, required: true },
  doctorId: { type: String, unique: true },
  fullName: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  contactNumber: String,
  department: {
    type: String,
    enum: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "General Medicine",
      "Dermatology",
      "Oncology", // Added
      "Gynecology", // Added
      "Psychiatry", // Added
      "Endocrinology", // Added
      "ENT", // Added (Ear, Nose, Throat)
      "Urology", // Added
      "Rheumatology", // Added
      "Plastic Surgery", // Added
      "Gastroenterology", // Added
      "Pulmonology", // Added
    ],
  },
  specialization: {
    type: String,
    enum: [
      "Surgery",
      "General Practice",
      "Dermatology",
      "Dentistry",
      "Psychiatry",
      "Cardiac Surgery", // Added
      "Orthopedic Surgery", // Added
      "Neuro Surgery", // Added
      "Pediatric Surgery", // Added
      "Plastic Surgery", // Added
      "Internal Medicine", // Added
      "Radiology", // Added
      "Pathology", // Added
      "Anesthesiology", // Added
      "Ophthalmology", // Added
      "ENT Surgery", // Added (Ear, Nose, Throat)
      "Obstetrics & Gynecology", // Added
      "Gastroenterology", // Added
      "Pulmonology", // Added
      "General Surgery", // Added
      "Oncological Surgery", // Added
    ],
  },
  qualification: String,
  yearsOfExperience: Number,
  email: { type: String, unique: true },
  availability: {
    type: String,
    enum: ["Full-time", "Part-time", "On-call"],
  },
  consultationMethod: {
    type: String,
    enum: ["In-person", "Online", "Both"], // Added "Both" option
  },
  doctorsFee: Number,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
