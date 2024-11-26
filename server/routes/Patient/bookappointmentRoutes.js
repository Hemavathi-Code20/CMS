import express from 'express';
const router = express.Router();
import FixAppointment from '../../models/Doctor/FixAppointment.js';

// Post a new appointment (Patient books appointment)
router.post("/bookappointments", async (req, res) => {
  const { patientName, doctorName, date, time } = req.body;
  try {
    const newAppointment = new FixAppointment({
      patientName,
      doctorName,
      date,
      time,
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment.", error: error.message });
  }
});

// Get all booked appointments for a patient
router.get("/bookappointments", async (req, res) => {
  try {
    const appointments = await FixAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments.", error: error.message });
  }
});

export default router;
