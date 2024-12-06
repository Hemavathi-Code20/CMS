import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import MaintenanceForm from "../Components/MaintenanceForm";
import MaintenanceList from "../Components/MaintenanceList";
import "./mainpage.css";

const MaintenancePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  const toggleRefresh = () => setRefresh((prev) => !prev);

  const handleEditClick = (data) => {
    setEditData(data); // Set the selected record for editing
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setEditData(null); // Clear edit data
  };

  return (
    <div className="management-page">
      <h1>Maintenance </h1>
      <button
        className="record-button"
        onClick={() => {
          setEditData(null); // Clear any previous data
          setIsModalOpen(true); // Open the modal
        }}
      >
        Manage Maintenance
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <MdClose size={24} />
            </button>
            <MaintenanceForm
              onAddSuccess={() => {
                toggleRefresh();
                closeModal();
              }}
              editData={editData}
            />
          </div>
        </div>
      )}

      <MaintenanceList refresh={refresh} onEditClick={handleEditClick} />
    </div>
  );
};

export default MaintenancePage;
