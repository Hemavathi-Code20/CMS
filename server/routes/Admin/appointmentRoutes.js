import express from "express";
import PatientAppointment from "../../models/Admin/PatientAppointment.js";
import FixAppointment from "../../models/Doctor/FixAppointment.js"; // Assuming this is where the doctor confirms appointments

const router = express.Router();

// Get all confirmed appointments for admin view
router.get("/confirmed", async (req, res) => {
  try {
    // Fetch all confirmed appointments from the PatientAppointment collection
    const confirmedAppointments = await PatientAppointment.find({ appointmentStatus: "Confirmed" });

    // If no confirmed appointments, return a message
    if (confirmedAppointments.length === 0) {
      return res.status(404).json({ message: "No confirmed appointments found." });
    }

    res.status(200).json(confirmedAppointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching confirmed appointments.", error: error.message });
  }
});

// Update appointment status (from Pending to Confirmed) when doctor confirms
router.put("/confirm/:id", async (req, res) => {
  const { id } = req.params; // Extracting the appointment ID from the URL params
  const { status } = req.body; // Extracting the status (which should be 'Confirmed') from the request body

  try {
    // Ensure the status is 'Confirmed'
    if (status !== "Confirmed") {
      return res.status(400).json({ message: "Invalid status. It must be 'Confirmed'." });
    }

    // Find the appointment in the FixAppointment model by ID
    const fixAppointment = await FixAppointment.findById(id);

    // If the appointment is not found, return an error
    if (!fixAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Update the FixAppointment status to 'Confirmed'
    fixAppointment.status = "Confirmed"; 
    await fixAppointment.save(); // Save the updated FixAppointment

    // Create a new PatientAppointment entry for the admin to view
    const patientAppointment = new PatientAppointment({
      patientID: fixAppointment.patientId,
      fullName: fixAppointment.fullName,
      contactNumber: fixAppointment.contactNumber,
      appointmentType: fixAppointment.appointmentType,
      preferredDoctor: fixAppointment.preferredDoctor,
      preferredDate: fixAppointment.preferredDate,
      preferredTimeSlot: fixAppointment.preferredTimeSlot,
      appointmentStatus: "Confirmed", // Set the status as confirmed
    });

    // Save the newly created PatientAppointment to the database
    await patientAppointment.save();

    // Return a success message with the newly created PatientAppointment data
    res.status(200).json({ 
      message: "Appointment confirmed successfully.", 
      patientAppointment 
    });
  } catch (error) {
    res.status(500).json({ message: "Error confirming appointment.", error: error.message });
  }
});

export default router;
