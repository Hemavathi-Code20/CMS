import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaintenanceList = ({ refresh, onEditClick }) => {
    const [maintenanceList, setMaintenanceList] = useState([]);

    const fetchMaintenanceData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/maintenance');
            setMaintenanceList(response.data);
        } catch (error) {
            console.error('Error fetching maintenance data:', error);
            alert('Failed to fetch maintenance schedules.');
        }
    };

    useEffect(() => {
        fetchMaintenanceData();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/maintenance/${id}`);
            alert('Maintenance record deleted successfully');
            fetchMaintenanceData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Failed to delete the record.');
        }
    };

    const handleEdit = (item) => {
        onEditClick(item); // Pass the selected item for editing
    };

    return (
        <div style={{ margin: '20px' }}>
            <h3>Maintenance Schedules</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Asset Name</th>
                        <th>Scheduled Date</th>
                        <th>Technician</th>
                        <th>Maintenance Type</th>
                        <th>Maintenance Frequency</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenanceList.map((item) => (
                        <tr key={item._id}>
                            <td>{item.assetName}</td>
                            <td>{new Date(item.scheduledDate).toLocaleDateString()}</td>
                            <td>{item.technician}</td>
                            <td>{item.maintenanceType}</td>
                            <td>{item.maintenanceFrequency}</td>
                            <td>{item.status}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceList;
