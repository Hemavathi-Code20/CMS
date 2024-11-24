import React from 'react';
import './InventoryTable.css';

const InventoryTable = ({ items, onUpdateItem, onDeleteItem }) => {
  const handleEdit = (item) => {
    onUpdateItem(item);
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Item Name</th>
          <th>Item Code</th>
          <th>Category</th>
          <th>Supplier Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Expiry Date</th>
          <th>Supplier Contact</th>
          <th>Stock Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.itemName}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              ) : (
                <span>No Image</span>
              )}
            </td>
            <td>{item.itemName}</td>
            <td>{item.itemCode}</td>
            <td>{item.category}</td>
            <td>{item.supplierName}</td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>{item.expiryDate}</td>
            <td>{item.supplierContact}</td>
            <td>{item.stockStatus}</td>
            <td>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
