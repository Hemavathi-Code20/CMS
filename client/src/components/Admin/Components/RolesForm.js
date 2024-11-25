import React, { useState, useEffect } from "react";

const RolesForm = ({ onAddRole, onUpdateRole, selectedRole }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePicture: "",
    role: "",
    accessLevel: "",
    employeeId: "",
    department: "",
    designation: "",
    specialization: "",
    workShift: "",
    availability: "",
    accountStatus: "Active",
    joiningDate: "",
  });

  useEffect(() => {
    if (selectedRole) {
      setFormData(selectedRole);
    }
  }, [selectedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleprofilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevItem) => ({
        ...prevItem,
        profilePicture: reader.result, // Save image as base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onUpdateRole(formData); // Update item
    } else {
      onAddRole(formData); // Add new item
    }
    setFormData({
      profilePicture: "", // Reset image field
      fullName: "",
      email: "",
      phone: "",
      role: "",
      accessLevel: "",
      employeeId: "",
      department: "",
      designation: "",
      specialization: "",
      workShift: "",
      availability: "",
      accountStatus: "",
      joiningDate: "",
    });
  };

  return (
    <form className="roles-form" onSubmit={handleSubmit}>
      <h2>{selectedRole ? "Update Roles" : "Add new Role"}</h2>

      <div className="role-group">
        <label htmlFor="profilePicture">Profile picture:</label>
        <input
          type="file"
          id="image"
          name="profilePicture"
          accept="image/*"
          onChange={handleprofilePictureChange}
        />
        {formData.profilePicture && (
          <img
            src={formData.profilePicture}
            alt="Preview"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
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
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option>Receptionist</option>
          <option>Nurse</option>
          <option>Medical Assistant</option>
          <option>Lab Technician</option>
          <option>Pharmacist</option>
          <option>Accountant</option>
          <option>Administrator</option>
          <option>IT Support Staff</option>
          <option>Cleaner/Janitorial Staff</option>
          <option>Clinic Manager</option>
          <option>Billing Specialist</option>
          <option>Healthcare Coordinator</option>
          <option>Radiology Technician</option>
          <option>Therapist</option>
          <option>Dietitian/Nutritionist</option>
        </select>
      </div>
      <div>
        <label>Access Level:</label>
        <select
          name="accessLevel"
          value={formData.accessLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Access Level</option>
          <option>Admin</option>
          <option>Staff</option>
          <option>Limited</option>
        </select>
      </div>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Designation/Position:</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Work Shift:</label>
        <input
          type="text"
          name="workShift"
          value={formData.workShift}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Availability:</label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Account Status:</label>
        <select
          name="accountStatus"
          value={formData.accountStatus}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>Suspended</option>
        </select>
      </div>
      <div>
        <label>Joining Date:</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        {selectedRole ? "update Role" : " Add Role"}
      </button>
    </form>
  );
};

export default RolesForm;
