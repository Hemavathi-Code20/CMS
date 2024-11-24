import express from 'express';
import Inventory from '../../models/Admin/Inventory.js';

const router = express.Router();

// Create new inventory item
router.post('/', async (req, res) => {
  try {
    const newInventoryItem = new Inventory(req.body);
    await newInventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
