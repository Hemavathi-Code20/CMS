import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"; // Import the close icon
import DoctorTable from "../Components/DoctorTable";
import DoctorForm from "../Components/DoctorForm";
import DoctorDetail from "../Components/DoctorDetail";
import "../../styles/DoctorManagement.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showDoctorDetail, setShowDoctorDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (doctor) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });
      if (res.ok) {
        fetchDoctors(); // Refresh the list after adding
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to add doctor:", error);
    }
  };

  const handleUpdateDoctor = async (doctor) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/doctors/${doctor._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doctor),
        }
      );
      if (res.ok) {
        fetchDoctors(); // Refresh the list after updating
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to update doctor:", error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/doctors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDoctors(); // Refresh the list after deleting
        closeDetailModal();
      }
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const closeAddModal = () => {
    setIsAdding(false);
    fetchDoctors(); // Ensure the list is updated
  };

  const closeDetailModal = () => {
    setShowDoctorDetail(false);
    fetchDoctors(); // Ensure the list is updated
  };

  const handleEditClick = () => {
    if (selectedDoctor) {
      setIsAdding(true);
      setShowDoctorDetail(false); // Close DoctorDetail modal if open
    }
  };

  return (
    <div className="doctor-management">
      <h1>Doctor Management</h1>
      <button
        className="record-button"
        onClick={() => {
          setIsAdding(true);
          setSelectedDoctor(null);
        }}
      >
        Add Record
      </button>

      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeAddModal}>
              <MdClose size={24} />
            </button>
            <DoctorForm
              onSubmit={selectedDoctor ? handleUpdateDoctor : handleAddDoctor}
              initialData={selectedDoctor}
            />
          </div>
        </div>
      )}

      {showDoctorDetail && selectedDoctor && (
        <div className="doctor-detail-modal-overlay">
          <div className="doctor-detail-modal-content">
            <button
              className="doctor-detail-close-button"
              onClick={closeDetailModal}
            >
              <MdClose size={24} />
            </button>
            <DoctorDetail
              doctor={selectedDoctor}
              onEdit={handleEditClick}
              onDelete={() => handleDeleteDoctor(selectedDoctor._id)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        !isAdding &&
        !showDoctorDetail && (
          <DoctorTable
            doctors={doctors}
            onCardClick={(id) => {
              const doctor = doctors.find((doc) => doc._id === id);
              setSelectedDoctor(doctor);
              setShowDoctorDetail(true);
            }}
          />
        )
      )}
    </div>
  );
};

export default DoctorManagement;
