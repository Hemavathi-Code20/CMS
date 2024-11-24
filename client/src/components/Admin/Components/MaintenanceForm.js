import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceForm = ({ onAddSuccess, editData }) => {
    const [assetName, setAssetName] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [technician, setTechnician] = useState('');
    const [maintenanceType, setMaintenanceType] = useState('routine');
    const [maintenanceFrequency, setMaintenanceFrequency] = useState('monthly');
    const [status, setStatus] = useState('scheduled');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (editData) {
            setAssetName(editData.assetName);
            setScheduledDate(editData.scheduledDate);
            setTechnician(editData.technician);
            setMaintenanceType(editData.maintenanceType);
            setMaintenanceFrequency(editData.maintenanceFrequency);
            setStatus(editData.status);
            setIsEditMode(true);
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Update maintenance
                await axios.put(`http://localhost:5000/api/admin/maintenance/${editData._id}`, {
                    assetName,
                    scheduledDate: new Date(scheduledDate),
                    technician,
                    maintenanceType,
                    maintenanceFrequency,
                    status,
                });
                alert('Maintenance updated successfully');
            } else {
                // Create new maintenance
                await axios.post('http://localhost:5000/api/admin/maintenance', {
                    assetName,
                    scheduledDate: new Date(scheduledDate),
                    technician,
                    maintenanceType,
                    maintenanceFrequency,
                    status,
                });
                alert('Maintenance scheduled successfully');
            }

            onAddSuccess();  // Refresh list after add/update
            // Reset form fields
            setAssetName('');
            setScheduledDate('');
            setTechnician('');
            setMaintenanceType('routine');
            setMaintenanceFrequency('monthly');
            setStatus('scheduled');
            setIsEditMode(false);  // Reset edit mode
        } catch (error) {
            console.error('Error submitting maintenance:', error);
            alert(error.response?.data?.error || 'Error scheduling maintenance');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
            <h3>{isEditMode ? 'Update Maintenance Schedule' : 'Create Maintenance Schedule'}</h3>
            
            <div>
                <label>Asset Name:</label>
                <input
                    type="text"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label>Scheduled Date:</label>
                <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label>Technician:</label>
                <input
                    type="text"
                    value={technician}
                    onChange={(e) => setTechnician(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label>Maintenance Type:</label>
                <select
                    value={maintenanceType}
                    onChange={(e) => setMaintenanceType(e.target.value)}
                >
                    <option value="routine">Routine</option>
                    <option value="emergency">Emergency</option>
                    <option value="repair">Repair</option>
                </select>
            </div>

            <div>
                <label>Maintenance Frequency:</label>
                <select
                    value={maintenanceFrequency}
                    onChange={(e) => setMaintenanceFrequency(e.target.value)}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                </select>
            </div>

            <div>
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            
            <button type="submit">{isEditMode ? 'Update' : 'Save'}</button>
        </form>
    );
};

export default MaintenanceForm;
