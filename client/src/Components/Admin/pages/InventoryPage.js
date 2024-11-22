import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from '../components/InventoryForm';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchInventory = async () => {
    const response = await axios.get('http://localhost:5000/api/inventory');
    setInventory(response.data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/inventory/delete/${id}`);
    fetchInventory();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleSave = () => {
    fetchInventory();
    setSelectedItem(null);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <InventoryForm item={selectedItem} onSave={handleSave} />
      <h2>Inventory List</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.itemName} ({item.itemCode}) - {item.quantity} units
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryPage;
