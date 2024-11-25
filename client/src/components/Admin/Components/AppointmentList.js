import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './appointmentlist.css';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'in-person',
    doctorName: '',
    doctorspeciality: ''
  });

  const fetchAppointmentsList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/appointments/${id}`);
      fetchAppointmentsList();
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patientName: appointment.patientName,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      appointmentType: appointment.appointmentType,
      doctorName: appointment.doctorName,
      doctorspeciality: appointment.doctorspeciality
    });
    setIsModalOpen(true);
    setIsUpdateMode(false); // Set to false by default when viewing details
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${selectedAppointment._id}`, formData);
      alert('Appointment updated successfully');
      fetchAppointmentsList();
      closeModal();
    } catch (error) {
      console.error('Error updating appointment', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setIsUpdateMode(false);
  };

  return (
    <div>
      <h1>Appointments List</h1>
      <div className="appointments-container">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="appointment-card"
            onClick={() => handleCardClick(appointment)}
          >
            <div className="appointment-card-header">
              <h3>{appointment.patientName}</h3>
              <p>{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
            </div>
            <div className="appointment-card-body">
              <p><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName}</p>
              <p><strong>Mode:</strong> {appointment.appointmentType}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isUpdateMode ? 'Update Appointment' : 'Appointment Details'}</h2>
              <span className="close-icon" onClick={closeModal}>&times;</span>
            </div>
            {isUpdateMode ? (
              <form onSubmit={handleUpdate}>
                <div>
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
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
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="doctorspeciality"
                    placeholder="Doctor Speciality"
                    value={formData.doctorspeciality}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>Patient Name:</strong> {selectedAppointment.patientName}</p>
                <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Appointment Time:</strong> {selectedAppointment.appointmentTime}</p>
                <p><strong>Mode:</strong> {selectedAppointment.appointmentType}</p>
                <p><strong>Doctor Name:</strong> {selectedAppointment.doctorName}</p>
                <p><strong>Doctor Speciality:</strong> {selectedAppointment.doctorspeciality}</p>
                <div className="modal-actions">
                  <button onClick={() => setIsUpdateMode(true)}>Update</button>
                  <button onClick={() => handleDelete(selectedAppointment._id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
