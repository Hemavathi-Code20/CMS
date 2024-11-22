const express = require('express');
const router = express.Router();
const Maintenance = require('../models/maintenanceModel'); // Assuming you have a Maintenance model

// POST: Create a new maintenance record
router.post('/', async (req, res) => {
  const { equipmentId, maintenanceDate, technician, description } = req.body;

  if (!equipmentId || !maintenanceDate || !technician || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Check if the maintenanceDate is valid
  const parsedDate = new Date(maintenanceDate);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: 'Invalid maintenance date!' });
  }

  try {
    const maintenance = new Maintenance({
      equipmentId,
      maintenanceDate: parsedDate,
      technician,
      description
    });

    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    console.error("Error during maintenance creation:", error);
    res.status(500).json({ message: 'Error scheduling maintenance', error });
  }
});

// GET: Fetch all maintenance records with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, equipmentId, startDate, endDate } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (equipmentId) filters.equipmentId = equipmentId;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Invalid date range' });
      }
      filters.maintenanceDate = { $gte: start, $lte: end };
    }

    const maintenance = await Maintenance.find(filters);
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID: Fetch specific maintenance record by ID
router.get('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) return res.status(404).json({ message: 'Maintenance not found' });
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a maintenance record
router.put('/:id', async (req, res) => {
  try {
    const { status, technician, maintenanceDate, description } = req.body;

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status, technician, maintenanceDate, description },
      { new: true }
    );

    if (!updatedMaintenance) return res.status(404).json({ message: 'Maintenance not found' });
    res.status(200).json(updatedMaintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete a maintenance record
router.delete('/:id', async (req, res) => {
  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deletedMaintenance) return res.status(404).json({ message: 'Maintenance not found' });
    res.status(200).json({ message: 'Maintenance record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
