import React from "react";
import "../../styles/RolesTable.css";

const RolesTable = ({ roles, onCardClick }) => {
  return (
    <div className="roles-table">
      {roles.map((role) => (
        <div
          key={role._id}
          className="role-card"
          onClick={() => onCardClick(role._id)}
        >
          <h3>{role.fullName}</h3>
          <img
            src={role.profilePicture || "default-profile.png"}
            alt={`${role.fullName} profile`}
          />
          <p>{role.role}</p>
          <p className="department">{role.department}</p>
          <p>{role.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default RolesTable;
