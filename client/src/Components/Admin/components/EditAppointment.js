import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAppointmentForm = () => {
  const { id } = useParams(); // Extract the appointment ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    contactNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "",
    doctorName: "",
    appointmentStatus: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing appointment data
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/${id}`);
        setFormData(response.data); // Populate form data with fetched details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/appointments/modify/${id}`, formData);
      alert("Appointment updated successfully");
      navigate("/appointments"); // Redirect to appointments list
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (loading) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Appointment</h3>
      <input
        type="text"
        name="patientName"
        value={formData.patientName}
        onChange={handleChange}
        placeholder="Patient Name"
        required
      />
      <input
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Gender"
        required
      />
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Appointment Date:</label>
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Appointment Time:</label>
        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Appointment Type:</label>
        <input
          type="text"
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Doctor Name:</label>
        <input
          type="text"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Appointment Status:</label>
        <select
          name="appointmentStatus"
          value={formData.appointmentStatus}
          onChange={handleChange}
          required
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <button type="submit">Update Appointment</button>
    </form>
  );
};

export default EditAppointmentForm;
