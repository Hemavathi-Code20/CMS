const Maintenance = require('../models/maintenanceModel');

// Create a new maintenance schedule
const createMaintenance = async (req, res) => {
  try {
    const { equipmentId, maintenanceDate, technician, description } = req.body;
    const newMaintenance = new Maintenance({
      equipmentId,
      maintenanceDate,
      technician,
      description
    });
    await newMaintenance.save();
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating maintenance schedule', error });
  }
};

// Get all maintenance schedules
const getAllMaintenance = async (req, res) => {
  try {
    const { status, equipmentId, startDate, endDate } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (equipmentId) filters.equipmentId = equipmentId;
    if (startDate && endDate) filters.maintenanceDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    
    const maintenanceSchedules = await Maintenance.find(filters);
    res.status(200).json(maintenanceSchedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance schedules', error });
  }
};

// Get a specific maintenance record
const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await Maintenance.findById(id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance record', error });
  }
};

// Update maintenance schedule (status, technician, description)
const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, technician, maintenanceDate, description } = req.body;

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(id, {
      status,
      technician,
      maintenanceDate,
      description
    }, { new: true });

    if (!updatedMaintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    res.status(200).json(updatedMaintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance schedule', error });
  }
};

// Delete a maintenance schedule
const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    if (!deletedMaintenance) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    res.status(200).json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maintenance record', error });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
};
