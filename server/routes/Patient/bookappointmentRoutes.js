import express from "express";
const router = express.Router();
import FixAppointment from "../../models/Doctor/FixAppointment.js";

// Post a new appointment (Patient books appointment)
router.post("/bookappointments", async (req, res) => {
  const {
    patientId,
    fullName,
    gender,
    contactNumber,
    appointmentType,
    consultationMode,
    preferredDoctor,
    urgencyLevel,
    preferredDate,
    preferredTimeSlot,
    reasonForAppointment,
    symptoms,
    department,
    preferredCommunicationMethod,
    termsAndConditionsAccepted,
  } = req.body;
  try {
    const newAppointment = new FixAppointment({
      patientId,
      fullName,
      gender,
      contactNumber,
      appointmentType,
      consultationMode,
      preferredDoctor,
      urgencyLevel,
      preferredDate,
      preferredTimeSlot,
      reasonForAppointment,
      symptoms,
      department,
      preferredCommunicationMethod,
      termsAndConditionsAccepted,
    });
    await newAppointment.save();
    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment.", error: error.message });
  }
});

// Get all booked appointments for a patient
// Get all booked appointments for a specific patient
router.get("/bookappointments", async (req, res) => {
  const patientId = req.query.patientId;  // Get patientId from query parameters
  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  try {
    const appointments = await FixAppointment.find({ patientId: patientId }); // Filter by patientId
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments.", error: error.message });
  }
});


export default router;
