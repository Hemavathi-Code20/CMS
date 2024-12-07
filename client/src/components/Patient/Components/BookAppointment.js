import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/BookAppointment.css";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Initially empty
    fullName: "",
    gender: "",
    contactNumber: "",
    appointmentType: "",
    consultationMode: "",
    preferredDate: "",
    urgencyLevel: "",
    preferredTimeSlot: "",
    reasonForAppointment: "",
    symptoms: "",
    department: "",
    preferredCommunicationMethod: "",
    termsAndConditionsAccepted: false,
  });

  // Assuming patientId is stored in localStorage or passed as a prop (for example purposes)
  useEffect(() => {
    const patientId = localStorage.getItem("patientId"); // Or get it from props or context
    if (patientId) {
      setFormData((prevData) => ({ ...prevData, patientId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient/bookappointments",
        formData
      );
      alert(response.data.message || "Appointment booked successfully!");
      setFormData({
        patientId: formData.patientId, // Keep patientId after form reset
        fullName: "",
        gender: "",
        contactNumber: "",
        appointmentType: "",
        consultationMode: "",
        preferredDate: "",
        preferredTimeSlot: "",
        reasonForAppointment: "",
        symptoms: "",
        department: "",
        preferredCommunicationMethod: "",
        termsAndConditionsAccepted: false,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error booking appointment.");
    }
  };

  return (
    <form className="book-appointment-container" onSubmit={handleSubmit}>
      <div>
        <label>Patient ID:</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          readOnly
        />
      </div>

      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

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
        <label>Appointment Type:</label>
        <select
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleChange}
          required
        >
          <option value="">Select Appointment Type</option>
          <option value="New Consultation">New Consultation</option>
          <option value="Follow-Up">Follow-Up</option>
          <option value="Teleconsultation">Teleconsultation</option>
        </select>
      </div>

      <div>
        <label>Consultation Mode:</label>
        <select
          name="consultationMode"
          value={formData.consultationMode}
          onChange={handleChange}
          required
        >
          <option value="">Select Consultation Mode</option>
          <option value="In-person">In-person</option>
          <option value="Virtual/Telemedicine">Virtual/Telemedicine</option>
        </select>
      </div>

      <div>
        <label>Preferred Doctor:</label>
        <input
          type="text"
          name="preferredDoctor"
          value={formData.preferredDoctor}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Urgency Level:</label>
        <select
          name="urgencyLevel"
          value={formData.urgencyLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Urgency Level</option>
          <option value="Routine">Routine</option>
          <option value="Urgent">Urgent</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      <div>
        <label>Preferred Date:</label>
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Preferred Time Slot:</label>
        <input
          type="time"
          name="preferredTimeSlot"
          value={formData.preferredTimeSlot}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Reason for Appointment:</label>
        <textarea
          name="reasonForAppointment"
          value={formData.reasonForAppointment}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Symptoms:</label>
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Oncology">Oncology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="ENT">ENT</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label>Preferred Communication Method:</label>
        <select
          name="preferredCommunicationMethod"
          value={formData.preferredCommunicationMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Communication Method</option>
          <option value="Call">Call</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="termsAndConditionsAccepted"
            checked={formData.termsAndConditionsAccepted}
            onChange={handleChange}
            required
          />
          I Agree to Terms and Conditions/Privacy Policy
        </label>
      </div>

      <button type="submit" className="appointment-button" >Book Appointment</button>
    </form>
  );
};

export default BookAppointment;
