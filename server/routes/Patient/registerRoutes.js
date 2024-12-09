import express from "express";
import Patient from "../../models/Patient/Register.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Helper function to generate PATIENTID
const generatePatientId = () => {
  const prefix = "PAT";
  const uniqueId = String(Date.now()).padStart(7, "0"); // Generates a unique numeric ID
  return `${prefix}${uniqueId}`;
};

// Register a new patient
router.post("/patientregister", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // Generate a unique PATIENTID
    const patientId = generatePatientId();

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient instance
    const newPatient = new Patient({
      patientId,
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the new patient to the database
    await newPatient.save();

    res.status(201).json({
      message: "Registration successful",
      patientId: newPatient.patientId,
      fullname: newPatient.fullname,
      email: newPatient.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login route for patients
router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  try {
    // Find the patient by patientId
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      patientId: patient.patientId,
      fullname: patient.fullname,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Patient Profile
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findOne({ patientId: id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      patientId: patient.patientId,
      fullname: patient.fullname,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      age: patient.age,
      gender: patient.gender,
      contactNumber: patient.contactNumber,
      location: patient.location,
      bloodType:patient.bloodType,
      occupation: patient.occupation,
      generalDoctorName: patient.generalDoctorName,
      doctorSpeciality: patient.doctorSpeciality,
      insuranceInformation: patient.insuranceInformation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update Patient Profile
router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    email,
    phone,
    address,
    age,
    gender,
    contactNumber,
    location,
    bloodType,
    occupation,
    generalDoctorName,
    doctorSpeciality,
    insuranceInformation,
  } = req.body;

  try {
    // Update the patient profile with proper nested objects
    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId: id },
      {
        fullname,
        email,
        phone,
        address,
        age,
        gender,
        contactNumber,
        location: location || {}, 
        bloodType,
        occupation,
        generalDoctorName,
        doctorSpeciality,
        insuranceInformation: insuranceInformation || {}, // Ensure insuranceInformation is updated properly
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
export default router;
