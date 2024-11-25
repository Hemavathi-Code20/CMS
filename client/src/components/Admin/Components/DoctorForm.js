import React, { useState, useEffect } from "react";

const DoctorForm = ({ onSubmit, initialData = {} }) => {
  // Ensure initialData is an object, even if null or undefined is passed
  const formDataFromProps = initialData || {};

  const [formData, setFormData] = useState({
    profilePicture: formDataFromProps.profilePicture || "", // default value if null/undefined
    doctorId: formDataFromProps.doctorId || "",
    fullName: formDataFromProps.fullName || "",
    gender: formDataFromProps.gender || "",
    contactNumber: formDataFromProps.contactNumber || "",
    department: formDataFromProps.department || "",
    specialization: formDataFromProps.specialization || "",
    qualification: formDataFromProps.qualification || "",
    yearsOfExperience: formDataFromProps.yearsOfExperience || "",
    email: formDataFromProps.email || "",
    availability: formDataFromProps.availability || "",
    consultationMethod: formDataFromProps.consultationMethod || "",
    doctorsFee: formDataFromProps.doctorsFee || "",
  });

  useEffect(() => {
    // Update formData only when initialData changes (for edit)
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <label>
        Profile Picture:
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />
      </label>
      <label>
        Doctor ID:
        <input
          type="text"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
        />
      </label>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Contact Number:
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Department:
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="General Medicine">General Medicine</option>
        </select>
      </label>
      <label>
        Specialization:
        <select name="specialization" value={formData.specialization} onChange={handleChange}>
          <option value="">Select Specialization</option>
          <option value="Surgery">Surgery</option>
          <option value="General Practice">General Practice</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Dentistry">Dentistry</option>
          <option value="Psychiatry">Psychiatry</option>
        </select>
      </label>
      <label>
        Qualification:
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
      </label>
      <label>
        Years of Experience:
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
        />
      </label>
      <label>
        Email Address:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Availability:
        <select name="availability" value={formData.availability} onChange={handleChange}>
          <option value="">Select Availability</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="On-call">On-call</option>
        </select>
      </label>
      <label>
        Consultation Method:
        <select
          name="consultationMethod"
          value={formData.consultationMethod}
          onChange={handleChange}
        >
          <option value="">Select Consultation Method</option>
          <option value="In-person">In-person</option>
          <option value="Online">Online</option>
        </select>
      </label>
      <label>
        Doctor's Fee:
        <input
          type="number"
          name="doctorsFee"
          value={formData.doctorsFee}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DoctorForm;
