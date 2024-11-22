import React, { useState } from 'react';
import { createMaintenance } from '../services/maintenanceService';

const MaintenanceScheduleForm = () => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    maintenanceDate: '',
    technician: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime()); // Checks if it's a valid date
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { equipmentId, maintenanceDate, technician, description } = formData;

    // Validate all required fields
    if (!equipmentId || !maintenanceDate || !technician || !description) {
      setError('All fields are required!');
      return;
    }

    // Ensure maintenance date is valid
    if (!isValidDate(maintenanceDate)) {
      setError('Invalid maintenance date!');
      return;
    }

    try {
      await createMaintenance(formData);  // Send form data to the backend
      setError('');
      alert('Maintenance scheduled successfully');
    } catch (error) {
      setError('Error scheduling maintenance: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Schedule Maintenance</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="equipmentId"
          placeholder="Equipment ID"
          value={formData.equipmentId}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="maintenanceDate"
          value={formData.maintenanceDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="technician"
          placeholder="Technician Name"
          value={formData.technician}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Maintenance Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button type="submit">Schedule Maintenance</button>
      </form>
    </div>
  );
};

export default MaintenanceScheduleForm;
