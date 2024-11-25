import React from "react";

const RolesTable = ({ roles, onUpdateRole, onDeleteRole }) => {
  const handleEdit = (formData) => {
    onUpdateRole(formData);
  };

  const handleDelete = (id) => {
    onDeleteRole(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Access Level</th>
          <th>Employee ID</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Specialization</th>
          <th>Work Shift</th>
          <th>Availability</th>
          <th>Account Status</th>
          <th>JoiningDate</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((formData) => (
          <tr key={formData._id}>
            <td>
              {formData.image ? (
                <img
                  src={formData.profilePicture}
                  alt={formData.fullName}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <span>No Image</span>
              )}
            </td>
            <td>{formData.fullName}</td>
            <td>{formData.employeeId}</td>
            <td>{formData.role}</td>
            <td>{formData.department}</td>
            <td>{formData.designation}</td>
            <td>{formData.joiningDate}</td>
            <td>{formData.workShift}</td>
            <td>
              <button onClick={() => handleEdit(formData)}>Edit</button>
              <button onClick={() => handleDelete(formData._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RolesTable;