import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from '../Components/AppointmentForm'; // Import AppointmentForm
import AppointmentList from '../Components/AppointmentList'; // Import AppointmentList

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false); // Track the deletion status
  const [deleteId, setDeleteId] = useState(null); // Track the ID of the appointment to be deleted
  const [newAppointment, setNewAppointment] = useState(null); // To track newly created appointment

  // Fetch appointments on initial load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };
    fetchAppointments();
  }, [newAppointment]); // Re-fetch appointments when a new one is added

  // Handle appointment deletion
  const handleDelete = async (id) => {
    if (!isDeleting) {
      // Set confirmation mode and store the appointment ID
      setDeleteId(id);
      setIsDeleting(true);
      return;
    }

    // Proceed to delete the appointment if the user confirmed
    try {
      await axios.delete(`http://localhost:5000/api/admin/appointments/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      setDeleteId(null); // Reset deletion confirmation state
      setIsDeleting(false); // Reset confirmation state
    } catch (error) {
      console.error('Error deleting appointment', error);
      setIsDeleting(false); // Reset if error occurs
      setDeleteId(null); // Reset deletion state
    }
  };

  return (
    <div>
      <h1>Manage Appointments</h1>
      
      {/* Appointment Form Component */}
      <AppointmentForm setNewAppointment={setNewAppointment} />

      {/* Appointment List Component */}
      <AppointmentList
        appointments={appointments}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default ManageAppointments;
