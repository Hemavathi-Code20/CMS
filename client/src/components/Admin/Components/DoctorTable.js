import React from "react";

const DoctorTable = ({ doctors, onCardClick }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            width: "200px",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onCardClick(doctor._id)}
        >
          <img
            src={doctor.profilePicture}
            alt="Doctor"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h3>{doctor.fullName}</h3>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
