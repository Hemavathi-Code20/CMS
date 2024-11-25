import React from "react";

const DoctorTable = ({ doctors, onCardClick }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          style={{
            border: "1px solid #333",
            padding: "20px",
            borderRadius: "8px",
            width: "180px",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onCardClick(doctor._id)}
        >
          <img
            src={doctor.profilePicture || "default-profile.png"} // Default image if profilePicture is missing
            alt="Doctor"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <h3>{doctor.fullName}</h3>
          <p>{doctor.specialization}</p>
          <p>{doctor.department}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
