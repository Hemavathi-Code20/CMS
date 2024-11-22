const Inventory = require('../models/Inventory');

// Add a new inventory item
exports.addInventory = async (req, res) => {
  const { itemName, itemCode, category, supplierName, quantity, unitPrice, expiryDate } = req.body;

  try {
    const newItem = new Inventory({
      itemName, itemCode, category, supplierName, quantity, unitPrice, expiryDate,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing inventory item
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { itemName, itemCode, category, supplierName, quantity, unitPrice, expiryDate } = req.body;

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { itemName, itemCode, category, supplierName, quantity, unitPrice, expiryDate },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an inventory item
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    await Inventory.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all inventory items
exports.getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
