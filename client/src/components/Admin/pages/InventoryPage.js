import React, { useState, useEffect } from 'react';
import InventoryForm from '../Components/InventoryForm';
import InventoryTable from '../Components/InventoryTable';
import axios from 'axios';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // state to track the selected item for editing

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/inventory', newItem);
      setInventory([...inventory, response.data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/inventory/${updatedItem._id}`, updatedItem);
      setInventory(inventory.map(item => (item._id === updatedItem._id ? response.data : item)));
      setSelectedItem(null); // Clear the form after updating
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/inventory/${id}`);
      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item); // Set the selected item for editing
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <InventoryForm onAddItem={addItem} onUpdateItem={updateItem} selectedItem={selectedItem} />
      <InventoryTable items={inventory} onUpdateItem={handleEditItem} onDeleteItem={deleteItem} />
    </div>
  );
};

export default InventoryPage;
