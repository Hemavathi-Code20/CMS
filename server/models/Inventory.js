const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemCode: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  supplierName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  expiryDate: { type: Date },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
