import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Appointmentlist.css';


const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    contactNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "",
    doctorName: "",
    appointmentStatus: "Upcoming",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/appointments/add", formData);
      console.log(response.data);
      alert("Appointment added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="patientName"
        placeholder="Patient Name"
        value={formData.patientName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="appointmentTime"
        value={formData.appointmentTime}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="appointmentType"
        placeholder="Appointment Type"
        value={formData.appointmentType}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="doctorName"
        placeholder="Doctor Name"
        value={formData.doctorName}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Appointment</button>
    </form>
  );
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${status}/${id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                appointmentStatus:
                  status === "completed" ? "Completed" : "Upcoming",
              }
            : appointment
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/appointments/edit/${id}`); // Navigate to Edit Appointment Form
  };

  return (
    <div className="appointment-list">
      <h3>Appointments</h3>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Doctor Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.contactNumber}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.appointmentStatus}</td>
              <td>
                <button
                  className="btn-completed"
                  onClick={() => handleStatusChange(appointment._id, "completed")}
                >
                  Mark Completed
                </button>
                <button
                  className="btn-upcoming"
                  onClick={() => handleStatusChange(appointment._id, "upcoming")}
                >
                  Mark Upcoming
                </button>
                <button
                  className="btn-update"
                  onClick={() => handleUpdate(appointment._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { AppointmentForm, AppointmentList };
