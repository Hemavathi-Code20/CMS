const express = require('express');
const router = express.Router();
const {
  addInventory,
  updateInventory,
  deleteInventory,
  getAllInventory,
} = require('../controllers/inventoryController');

router.post('/add', addInventory);
router.put('/update/:id', updateInventory);
router.delete('/delete/:id', deleteInventory);
router.get('/', getAllInventory);

module.exports = router;
