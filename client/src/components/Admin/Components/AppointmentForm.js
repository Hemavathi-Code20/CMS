import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm({ fetchAppointments }) {
  const [formData, setFormData] = useState({
    patientID: '',
    patientName: '',
    gender: '',
    contactNumber: '',
    location: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'in-person',
    doctorName: '',
    doctorspeciality: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/appointments/add', formData);
      alert('Appointment added successfully');
      fetchAppointments();  // Refetch the appointments after adding a new one
    } catch (error) {
      console.error('Error adding appointment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="patientID"
          placeholder="Patient ID"
          onChange={handleChange}
          value={formData.patientID}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          onChange={handleChange}
          value={formData.patientName}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          value={formData.gender}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          value={formData.contactNumber}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={formData.location}
        />
      </div>
      <div>
        <input
          type="date"
          name="appointmentDate"
          onChange={handleChange}
          value={formData.appointmentDate}
          required
        />
      </div>
      <div>
        <input
          type="time"
          name="appointmentTime"
          onChange={handleChange}
          value={formData.appointmentTime}
          required
        />
      </div>
      <div>
        <select
          name="appointmentType"
          onChange={handleChange}
          value={formData.appointmentType}
        >
          <option value="in-person">In-person</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          onChange={handleChange}
          value={formData.doctorName}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="doctorspeciality"
          placeholder="Doctor Speciality"
          onChange={handleChange}
          value={formData.doctorspeciality}
        />
      </div>
      <button type="submit">Add Appointment</button>
    </form>
  );
}

export default AppointmentForm;
