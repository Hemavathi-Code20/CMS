const Appointment = require('../models/Appointment');

// Add new appointment
const addAppointment = async (req, res) => {
  const { patientName, gender, contactNumber, appointmentDate, appointmentTime, appointmentType, doctorName, appointmentStatus } = req.body;

  try {
    const newAppointment = new Appointment({
      patientName,
      gender,
      contactNumber,
      appointmentDate,
      appointmentTime,
      appointmentType,
      doctorName,
      appointmentStatus,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modify appointment
const modifyAppointment = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark appointment as completed
const markCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { appointmentStatus: 'Completed' }, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark appointment as upcoming
const markUpcoming = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { appointmentStatus: 'Upcoming' }, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  addAppointment, 
  getAppointments, 
  getAppointmentById, // Add this to the exports
  modifyAppointment, 
  markCompleted, 
  markUpcoming 
};
