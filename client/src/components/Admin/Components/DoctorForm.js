import React, { useState, useEffect } from "react";

const DoctorForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    profilePicture: initialData.profilePicture || "",
    doctorId: initialData.doctorId || "",
    fullName: initialData.fullName || "",
    gender: initialData.gender || "",
    contactNumber: initialData.contactNumber || "",
    specialization: initialData.specialization || "",
    qualification: initialData.qualification || "",
    yearsOfExperience: initialData.yearsOfExperience || "",
    email: initialData.email || "",
    availability: initialData.availability || "",
    consultationMethod: initialData.consultationMethod || "",
    availabilityStatus: initialData.availabilityStatus || "",
    doctorsFee: initialData.doctorsFee || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });  // Update formData when initialData changes (for edit)
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>
        Profile Picture:
        <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
      </label>
      <label>
        Doctor ID:
        <input type="text" name="doctorId" value={formData.doctorId} onChange={handleChange} />
      </label>
      <label>
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Contact Number:
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>
      <label>
        Specialization:
        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
      </label>
      <label>
        Qualification:
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
      </label>
      <label>
        Years of Experience:
        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
      </label>
      <label>
        Email Address:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Availability:
        <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
      </label>
      <label>
        Consultation Method:
        <select name="consultationMethod" value={formData.consultationMethod} onChange={handleChange}>
          <option value="">Select</option>
          <option value="In-person">In-person</option>
          <option value="Online">Online</option>
        </select>
      </label>
      <label>
        Availability Status:
        <input type="text" name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} />
      </label>
      <label>
        Doctor's Fee:
        <input type="number" name="doctorsFee" value={formData.doctorsFee} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DoctorForm;
