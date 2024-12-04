import React from "react";
import "../../styles/DoctorTable.css";

const DoctorTable = ({ doctors, onCardClick }) => {
  return (
    <div className="doctor-table">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="doctor-card"
          onClick={() => onCardClick(doctor._id)}
        >
          <h3>{doctor.fullName}</h3>
          <img
            src={doctor.profilePicture || "default-profile.png"}
            alt={`${doctor.fullName} doctor`}
          />
          <p>{doctor.qualification}</p>
          <p className="specialization">{doctor.specialization}</p>
          <p>{doctor.department}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
