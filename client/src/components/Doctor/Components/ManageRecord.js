import React, { useState } from "react";
import axios from "axios";

const ManageRecord = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    age: "",
    gender: "",
    contactInfo: { phone: "", email: "", address: "" },
    knownAllergies: [],
    chronicConditions: [],
    previousSurgeries: "",
    vaccinationHistory: "",
    numberOfVisits: 0,
    visitDates: [],
    treatmentPlan: "",
    labTestResults: "",
    xRayImages: "",
    height: "",
    weight: "",
    bloodPressure: "",
    heartRate: "",
    doctorsNotes: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("contactInfo")) {
      const [section, field] = name.split("."); // "contactInfo.phone" -> ["contactInfo", "phone"]
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [field]: value, // Update the nested field
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the server
      const response = await axios.post("http://localhost:5000/api/doctor/managerecords", formData);
      console.log("Record added:", response.data);
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Patient ID:</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="contactInfo.phone" // This is how we update the nested state
          value={formData.contactInfo.phone} // This will ensure the input is bound to the phone number in the state
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="contactInfo.email"
          value={formData.contactInfo.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="contactInfo.address"
          value={formData.contactInfo.address}
          onChange={handleChange}
        />
      </div>
      {/* Add other form fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ManageRecord;
