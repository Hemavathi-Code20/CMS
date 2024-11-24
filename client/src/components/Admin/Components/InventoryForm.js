import React, { useState, useEffect } from 'react';
import './Inventory.css'; // Importing CSS file for styling

const InventoryForm = ({ onAddItem, onUpdateItem, selectedItem }) => {
  const [item, setItem] = useState({
    image: '', // New field for image
    itemName: '',
    itemCode: '',
    category: '',
    supplierName: '',
    quantity: 0,
    unitPrice: 0,
    expiryDate: '',
    supplierContact: '',
    stockStatus: '',
  });

  useEffect(() => {
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setItem((prevItem) => ({
        ...prevItem,
        image: reader.result, // Save image as base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      onUpdateItem(item); // Update item
    } else {
      onAddItem(item); // Add new item
    }
    setItem({
      image: '', // Reset image field
      itemName: '',
      itemCode: '',
      category: '',
      supplierName: '',
      quantity: 0,
      unitPrice: 0,
      expiryDate: '',
      supplierContact: '',
      stockStatus: '',
    });
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h2>{selectedItem ? 'Update Item' : 'Add New Item'}</h2>

      {/* New Image Upload Field */}
      <div className="form-group">
        <label htmlFor="image">Item Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {item.image && (
          <img
            src={item.image}
            alt="Preview"
            style={{ width: '100px', marginTop: '10px' }}
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={item.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="itemCode">Item Code:</label>
        <input
          type="text"
          id="itemCode"
          name="itemCode"
          value={item.itemCode}
          onChange={handleChange}
          placeholder="Enter item code"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={item.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supplierName">Supplier Name:</label>
        <input
          type="text"
          id="supplierName"
          name="supplierName"
          value={item.supplierName}
          onChange={handleChange}
          placeholder="Enter supplier name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="unitPrice">Unit Price:</label>
        <input
          type="number"
          id="unitPrice"
          name="unitPrice"
          value={item.unitPrice}
          onChange={handleChange}
          placeholder="Enter unit price"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={item.expiryDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supplierContact">Supplier Contact:</label>
        <input
          type="text"
          id="supplierContact"
          name="supplierContact"
          value={item.supplierContact}
          onChange={handleChange}
          placeholder="Enter supplier contact"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="stockStatus">Stock Status:</label>
        <select
          id="stockStatus"
          name="stockStatus"
          value={item.stockStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <button className="submit-button" type="submit">
        {selectedItem ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default InventoryForm;
