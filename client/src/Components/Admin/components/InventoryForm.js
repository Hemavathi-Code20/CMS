import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryForm = ({ item = {}, onSave }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemCode: '',
    category: '',
    supplierName: '',
    quantity: 0,
    unitPrice: 0,
    expiryDate: '',
  });

  useEffect(() => {
    if (item && item._id) {
      const formattedExpiryDate = item.expiryDate ? item.expiryDate.split('T')[0] : ''; // Format the date to yyyy-MM-dd
      setFormData({
        itemName: item.itemName,
        itemCode: item.itemCode,
        category: item.category,
        supplierName: item.supplierName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        expiryDate: formattedExpiryDate,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (item && item._id) {
      // Update existing item
      await axios.put(`http://localhost:5000/api/inventory/update/${item._id}`, formData);
    } else {
      // Add new item
      await axios.post('http://localhost:5000/api/inventory/add', formData);
    }

    onSave(); // Callback to refresh inventory list
    setFormData({
      itemName: '',
      itemCode: '',
      category: '',
      supplierName: '',
      quantity: 0,
      unitPrice: 0,
      expiryDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <input
        type="text"
        name="itemCode"
        value={formData.itemCode}
        onChange={handleChange}
        placeholder="Item Code"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="text"
        name="supplierName"
        value={formData.supplierName}
        onChange={handleChange}
        placeholder="Supplier Name"
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        name="unitPrice"
        value={formData.unitPrice}
        onChange={handleChange}
        placeholder="Unit Price"
        required
      />
      <input
        type="date"
        name="expiryDate"
        value={formData.expiryDate} // Ensure it's in yyyy-MM-dd format
        onChange={handleChange}
        placeholder="Expiry Date"
      />
      <button type="submit">{item && item._id ? 'Update' : 'Add'} Item</button>
    </form>
  );
};

export default InventoryForm;
