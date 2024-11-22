import React, { useState, useEffect } from 'react';
import './userform.css';

const UserForm = ({ onSubmit, initialData = {}, selectedCategory }) => {
  const [formData, setFormData] = useState(initialData);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setProfilePicture(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    onSubmit(data);
  };

  useEffect(() => {
    setFormData(initialData);  // Set initial data for editing
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Profile Picture Input */}
      <input
        type="file"
        name="profilePicture"
        onChange={handleChange}
        accept="image/*"
      />
      {/* Full Name Input */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName || ''}
        onChange={handleChange}
        required
      />
      {/* Gender Input */}
      <select name="gender" value={formData.gender || 'Male'} onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {/* Age Input */}
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age || ''}
        onChange={handleChange}
        required
      />
      {/* Contact Number Input */}
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber || ''}
        onChange={handleChange}
        required
      />
      {/* Email Address Input */}
      <input
        type="email"
        name="emailAddress"
        placeholder="Email Address"
        value={formData.emailAddress || ''}
        onChange={handleChange}
        required
      />
      {/* Joined Date Input */}
      <input
        type="date"
        name="joinedDate"
        placeholder="Joined Date"
        value={formData.joinedDate || ''}
        onChange={handleChange}
        required
      />
      {/* Role Input */}
      <input
        type="text"
        name="role"
        placeholder="Role/Designation"
        value={formData.role || ''}
        onChange={handleChange}
        required
      />
      {/* Years of Experience Input */}
      <input
        type="number"
        name="yearsOfExperience"
        placeholder="Years of Experience"
        value={formData.yearsOfExperience || ''}
        onChange={handleChange}
        required
      />

      {/* Category-specific Fields */}
      {selectedCategory === 'Doctor' && (
        <>
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="clinicTimings"
            placeholder="Clinic Timings"
            value={formData.clinicTimings || ''}
            onChange={handleChange}
          />
          <input
            type="number"
            name="consultationFee"
            placeholder="Consultation Fee"
            value={formData.consultationFee || ''}
            onChange={handleChange}
          />
        </>
      )}

      {['Staff', 'Nurse', 'Other'].includes(selectedCategory) && (
        <input
          type="text"
          name="workSchedule"
          placeholder="Work Schedule (Shift Timings)"
          value={formData.workSchedule || ''}
          onChange={handleChange}
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
