import express from 'express';
import PatientAppointment from '../../models/Admin/PatientAppointment.js'; // Ensure you use .js extension for ES modules

const router = express.Router();

// Create an appointment
router.post('/add', async (req, res) => {
  try {
    const appointment = new PatientAppointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await PatientAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await PatientAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    await PatientAppointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router as default
export default router;
