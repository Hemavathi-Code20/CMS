import React, { useState, useEffect } from 'react';
import { getAllMaintenance, updateMaintenance, deleteMaintenance } from '../services/maintenanceService';

const MaintenanceTracker = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    equipmentId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchMaintenance();
  }, [filters]);

  const fetchMaintenance = async () => {
    try {
      const response = await getAllMaintenance(filters);
      setMaintenanceList(response.data);
    } catch (error) {
      console.error('Error fetching maintenance:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateMaintenance(id, { status });
      fetchMaintenance(); // Re-fetch maintenance after update
    } catch (error) {
      console.error('Error updating maintenance status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMaintenance(id);
      fetchMaintenance(); // Re-fetch maintenance after delete
    } catch (error) {
      console.error('Error deleting maintenance record:', error);
    }
  };

  return (
    <div>
      <h2>Maintenance Tracker</h2>
      <div>
        <input
          type="text"
          placeholder="Equipment ID"
          value={filters.equipmentId}
          onChange={(e) => setFilters({ ...filters, equipmentId: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={fetchMaintenance}>Search</button>
      </div>
      <ul>
        {maintenanceList.map((maintenance) => (
          <li key={maintenance._id}>
            <span>{maintenance.equipmentId} - {maintenance.maintenanceDate}</span>
            <button onClick={() => handleStatusUpdate(maintenance._id, 'completed')}>Mark Completed</button>
            <button onClick={() => handleDelete(maintenance._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceTracker;
