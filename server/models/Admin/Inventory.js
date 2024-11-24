import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    image: { type: String, required: true },
    itemName: { type: String, required: true },
  itemCode: { type: String, required: true },
  category: { type: String, required: true },
  supplierName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  supplierContact: { type: String, required: true },
  stockStatus: { type: String, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
