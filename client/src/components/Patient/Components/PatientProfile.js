import React, { useState } from "react";

const PatientProfile = ({ patient, updatePatient }) => {
  const [formData, setFormData] = useState({ ...patient });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (send updated data to parent component or API)
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(formData); // Pass updated data to parent or API
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId} // Display the patient ID
            readOnly // Making the Patient ID read-only as it's auto-generated
            style={{
              display: "block",
              margin: "10px 0",
              padding: "5px",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Preferred Pronouns:</label>
          <input
            type="text"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PatientProfile;
