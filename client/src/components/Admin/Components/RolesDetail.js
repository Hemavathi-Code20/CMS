import React from "react";
import "../../styles/RolesDetail.css";

const RolesDetail = ({ role, onEdit, onDelete }) => {
  if (!role) {
    return <p>No role details available.</p>;
  }

  return (
    <div className="role-detail-container">
      <h2 className="role-name">{role.fullName}</h2>
      <div className="role-profile">
        <img
          src={role.profilePicture || "default-profile.png"}
          alt={`${role.fullName} profile`}
          className="profile-picture"
        />
        <div className="role-info">
          <p>
            <b>Full Name:</b> {role.fullName}
          </p>
          <p>
            <b>Email:</b> {role.email}
          </p>
          <p>
            <b>Phone:</b> {role.phone}
          </p>
          <p>
            <b>Role:</b> {role.role}
          </p>
          <p>
            <b>Access Level:</b> {role.accessLevel}
          </p>
          <p>
            <b>Employee ID:</b> {role.employeeId}
          </p>
          <p>
            <b>Department:</b> {role.department}
          </p>
          <p>
            <b>Designation/Position:</b> {role.designation}
          </p>
          <p>
            <b>Specialization:</b> {role.specialization}
          </p>
          <p>
            <b>Work Shift:</b> {role.workShift}
          </p>
          <p>
            <b>Availability:</b> {role.availability}
          </p>
          <p>
            <b>Account Status:</b> {role.accountStatus}
          </p>
          <p>
            <b>Joining Date:</b> {role.joiningDate}
          </p>
        </div>
      </div>

      <div className="role-action-buttons">
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default RolesDetail;
