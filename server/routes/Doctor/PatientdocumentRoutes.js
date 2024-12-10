import express from "express";
import Patient from "../../models/Patient/Register.js"; // Adjust the path if necessary

const router = express.Router();

// Route to get the list of all patients
router.get("/patients", async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await Patient.find();  // Fetch all patients
    
    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    // Return the list of patients, excluding sensitive data
    res.status(200).json(patients.map(patient => ({
      patientId: patient.patientId,
      fullname: patient.fullname,
      email: patient.email,
      phone: patient.phone,
      // Add any other relevant fields here
    })));
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get patient details by ID
router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;  // Extract the patient ID from the route

  try {
    // Find the patient using the patientId from the database
    const patient = await Patient.findOne({ patientId: id });
    
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Return patient details (excluding sensitive data like password)
    res.status(200).json({
      patientId: patient.patientId,
      fullname: patient.fullname,
      email: patient.email,
      phone: patient.phone,
      age: patient.age,
      gender: patient.gender,
      location: patient.location,
      bloodType: patient.bloodType,
      occupation: patient.occupation,
      generalDoctorName: patient.generalDoctorName,
      doctorSpeciality: patient.doctorSpeciality,
      insuranceInformation: patient.insuranceInformation,
    });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
