import React, { useState } from 'react';
import MaintenanceForm from '../Components/MaintenanceForm';
import MaintenanceList from '../Components/MaintenanceList';

const MaintenancePage = () => {
    const [refresh, setRefresh] = useState(false);
    const [editData, setEditData] = useState(null);

    const toggleRefresh = () => setRefresh((prev) => !prev);

    const handleEditClick = (data) => {
        setEditData(data); // Set the selected record for editing
    };

    return (
        <div>
            <h1>Maintenance Management</h1>
            <MaintenanceForm onAddSuccess={toggleRefresh} editData={editData} />
            <MaintenanceList refresh={refresh} onEditClick={handleEditClick} />
        </div>
    );
};

export default MaintenancePage;
