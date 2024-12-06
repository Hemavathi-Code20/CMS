import React, { useEffect, useState } from "react";
import axios from "axios";

const FixAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    preferredDate: "",
    preferredTimeSlot: "",
  });
  const [isRescheduleMode, setIsRescheduleMode] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Fetch all appointments (Doctor views all patient appointments)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctor/appointmentconfirmation");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };
    fetchAppointments();
  }, []);

  // Handle actions: Confirm, Reschedule, or Cancel
  const handleAction = async (id, action, updatedInfo = null) => {
    try {
      const payload = { action, ...updatedInfo };
      const response = await axios.put(`http://localhost:5000/api/doctor/appointmentconfirmation/${id}`, payload);
      alert(response.data.message || "Action performed successfully!");

      // Update status optimistically in the UI
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status: action } : appointment
        )
      );
    } catch (error) {
      console.error("Error performing action:", error.message);
      alert("Failed to perform action.");
    }
  };

  // Handle the Reschedule button click: Enable reschedule mode
  const handleRescheduleClick = (appointmentId) => {
    setIsRescheduleMode(true);
    setSelectedAppointmentId(appointmentId);
  };

  // Handle date and time input change
  const handleDateChange = (e) => {
    setUpdatedData({
      ...updatedData,
      preferredDate: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    setUpdatedData({
      ...updatedData,
      preferredTimeSlot: e.target.value,
    });
  };

  // Handle the reschedule submit
  const handleRescheduleSubmit = async () => {
    if (!updatedData.preferredDate || !updatedData.preferredTimeSlot) {
      alert("Please enter a valid date and time");
      return;
    }
    try {
      // Perform reschedule action
      await handleAction(selectedAppointmentId, "Rescheduled", updatedData);
  
      // Call to refresh the list of appointments after rescheduling
      const response = await axios.get("http://localhost:5000/api/doctor/appointmentconfirmation");
      setAppointments(response.data);  // Refresh the appointment list

      // Reset the state
      setIsRescheduleMode(false);
      setSelectedAppointmentId(null);
      setUpdatedData({
        preferredDate: "",
        preferredTimeSlot: "",
      });
    } catch (error) {
      console.error("Error during rescheduling:", error.message);
      alert("Failed to reschedule appointment.");
    }
  };

  return (
    <div>
      <h2>Manage Appointments</h2>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
              <p><strong>Full Name:</strong> {appointment.fullName}</p>
              <p><strong>Preferred Doctor:</strong> {appointment.preferredDate}</p>
              <p><strong>Preferred Date:</strong> {appointment.preferredDate}</p>
              <p><strong>Preferred TimeSlot:</strong> {appointment.preferredTimeSlot}</p>
              <p><strong>Status:</strong> {appointment.status || "Pending"}</p>

              {/* Buttons for Confirm, Reschedule, Cancel */}
              <div>
                <button onClick={() => handleAction(appointment._id, "Confirmed")}>Confirm</button>
                <button onClick={() => handleRescheduleClick(appointment._id)}>Reschedule</button>
                <button onClick={() => handleAction(appointment._id, "Canceled")}>Cancel</button>
              </div>

              {/* Reschedule Form (appears when Reschedule button is clicked) */}
              {isRescheduleMode && selectedAppointmentId === appointment._id && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Reschedule Appointment</h4>
                  <div>
                    <label>Date:</label>
                    <input
                      type="date"
                      value={updatedData.preferredDate}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div>
                    <label>Time:</label>
                    <input
                      type="time"
                      value={updatedData.preferredTimeSlot}
                      onChange={handleTimeChange}
                    />
                  </div>
                  <button onClick={handleRescheduleSubmit}>Submit Reschedule</button>
                  <button onClick={() => setIsRescheduleMode(false)}>Cancel</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FixAppointment;
