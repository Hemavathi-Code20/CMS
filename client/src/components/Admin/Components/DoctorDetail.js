import React from "react";
import "../../styles/DoctorDetails.css";

const DoctorDetail = ({ doctor, onEdit, onDelete }) => {
  if (!doctor) {
    return <p>No doctor details available.</p>;
  }

  return (
    <div className="doctor-detail-container">
      <h2 className="doctor-name">{doctor.fullName}</h2>
      <div className="doctor-profile">
        <img
          src={doctor.profilePicture || "default-profile.png"}
          alt={`${doctor.fullName} profile`}
          className="profile-picture"
        />
        <div className="doctor-info">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p>
            <b>Contact:</b> {doctor.contactNumber}
          </p>
          <p>
            <b>Years of Experience:</b> {doctor.yearsOfExperience}
          </p>
          <p>
            <b>Department:</b> {doctor.department}
          </p>
          <p>
            <b>Qualifications:</b> {doctor.qualification}
          </p>
          <p>
            <b>Gender:</b> {doctor.gender}
          </p>
          <p>
            <b>Availability:</b> {doctor.availability}
          </p>
          <p>
            <b>Consultation Method:</b> {doctor.consultationMethod}
          </p>
          <p>
            <b>Doctor's Fee:</b> ${doctor.doctorsFee}
          </p>
        </div>
      </div>

      <div className="doctor-action-buttons">
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

export default DoctorDetail;
