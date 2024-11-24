import React, { useState } from 'react';
import axios from 'axios';

function AddAppointment() {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="patientID" placeholder="Patient ID" onChange={handleChange} required />
      <input name="patientName" placeholder="Patient Name" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="appointmentDate" type="date" onChange={handleChange} required />
      <input name="appointmentTime" type="time" onChange={handleChange} required />
      <select name="appointmentType" onChange={handleChange}>
        <option value="in-person">In-person</option>
        <option value="online">Online</option>
      </select>
      <input name="doctorName" placeholder="Doctor Name" onChange={handleChange} required />
      <input name="doctorspeciality" placeholder="Doctor Speciality" onChange={handleChange} />
      <button type="submit">Add Appointment</button>
    </form>
  );
}

export default AddAppointment;
