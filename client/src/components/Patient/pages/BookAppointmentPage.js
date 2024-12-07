import React, { useEffect, useState } from "react";
import axios from "axios";
import BookAppointment from "../Components/BookAppointment";
import '../../styles/BookAppointmentPage.css'

const BookAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem("patientId"); // Retrieve the patient's ID from localStorage

  // Fetch the patient's booked appointments
  const fetchAppointments = async () => {
    try {
      if (!patientId) {
        console.error("No patient ID found");
        return;
      }
      
      // Send the patientId as a query parameter to the backend
      const response = await axios.get(
        `http://localhost:5000/api/patient/bookappointments?patientId=${patientId}`
      );
      console.log("Appointments fetched:", response.data); // Log to check the data returned
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchAppointments(); // Fetch the appointments when patientId is available
    }
  }, [patientId]);

  const handleStatusChange = (id, newStatus) => {
    // Update the status of the appointment directly in the UI (optimistic UI update)
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  return (
    <div>
      <h1>Patient Portal</h1>
      <BookAppointment fetchAppointments={fetchAppointments} />

      <h2>Your Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            border: "1px solid #ccc",
            marginTop: "20px",
            padding: "10px",
          }}
        >
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Appointment Type</th>
              <th>Reason for appointment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.preferredDoctor}</td>
                <td>{appointment.appointmentType}</td>
                <td>{appointment.reasonForAppointment}</td>
                <td>{appointment.preferredDate}</td>
                <td>{appointment.preferredTimeSlot}</td>
                <td>{appointment.status || "Pending"}</td>
                {/* Add status update buttons if the appointment is not confirmed or canceled */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookAppointmentPage;
