import express from "express";
const router = express.Router();
import Patient from "../../models/Patient/Patient.js";

// Register patient
router.post("/patientregister", async (req, res) => {
  const { fullName, email, password, profilePicture } = req.body;
  const patientId = `PAT-${Date.now()}`;

  try {
    const newPatient = new Patient({ patientId, fullName, email, password, profilePicture });
    await newPatient.save();
    res.status(201).json({ success: true, message: "Registration successful", patientId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login patient
router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  try {
    const patient = await Patient.findOne({ patientId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    if (patient.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful", patientId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
