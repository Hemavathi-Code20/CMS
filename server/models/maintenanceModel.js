const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  equipmentId: { type: Number, required: true },
  maintenanceDate: { type: Date, required: true },
  technician: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

module.exports = Maintenance;
