import React, { useEffect, useState } from "react";
import DoctorTable from '../Components/DoctorTable';
import DoctorForm from "../Components/DoctorForm";
import DoctorDetail from "../Components/DoctorDetail";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Fetch doctors data from the backend
  const fetchDoctors = async () => {
    const res = await fetch("http://localhost:5000/api/admin/doctors");
    const data = await res.json();
    setDoctors(data);
  };

  // Handle adding a new doctor
  const handleAddDoctor = async (doctor) => {
    const res = await fetch("http://localhost:5000/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });
    if (res.ok) {
      fetchDoctors();
      setIsAdding(false);  // Reset the add mode
    }
  };

  // Handle updating an existing doctor's data
  const handleUpdateDoctor = async (doctor) => {
    const res = await fetch(`http://localhost:5000/api/admin/doctors/${doctor._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });
    if (res.ok) {
      fetchDoctors();
      setSelectedDoctor(null); // Deselect the doctor after update
      setIsAdding(false); // Exit the add/edit mode
    }
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/doctors/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchDoctors();
      setSelectedDoctor(null); // Deselect the doctor after deletion
    }
  };

  return (
    <div>
      <h1>Doctor Management</h1>
      <button onClick={() => { setIsAdding(true); setSelectedDoctor(null); }}>Add Record</button>

      {/* Show the form for adding/editing a doctor */}
      {isAdding && (
        <DoctorForm
          onSubmit={selectedDoctor ? handleUpdateDoctor : handleAddDoctor}
          initialData={selectedDoctor}  // Pass selected doctor data if available for editing
        />
      )}

      {/* Display the selected doctor's details */}
      {selectedDoctor ? (
        <DoctorDetail
          doctor={selectedDoctor}
          onEdit={() => setIsAdding(true)}  // Switch to the add/edit mode
          onDelete={() => handleDeleteDoctor(selectedDoctor._id)}  // Handle delete
        />
      ) : (
        // Display the list of doctors
        <DoctorTable
          doctors={doctors}
          onCardClick={(id) => {
            const doctor = doctors.find((doc) => doc._id === id);
            setSelectedDoctor(doctor);  // Set the selected doctor to view/edit their details
          }}
        />
      )}
    </div>
  );
};

export default DoctorManagement;
