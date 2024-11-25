import React from "react";

const DoctorDetail = ({ doctor, onEdit, onDelete }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginTop: '20px' }}>
      <h2>{doctor.fullName}</h2>
      <img
        src={doctor.profilePicture || "default-profile.png"}  // Default image if profilePicture is missing
        alt="Doctor"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          marginBottom: '20px',
        }}
      />
      <div>
        <p><b>Specialization:</b> {doctor.specialization}</p>
        <p><b>Contact:</b> {doctor.contactNumber}</p>
        <p><b>Years of Experience:</b> {doctor.yearsOfExperience}</p>
        <p><b>Department:</b> {doctor.department}</p>
        <p><b>Qualifications:</b> {doctor.qualification}</p>
        <p><b>Gender:</b> {doctor.gender}</p>
        <p><b>Availability:</b> {doctor.availability}</p>
        <p><b>Consultation Method:</b> {doctor.consultationMethod}</p>
        <p><b>Doctor's Fee:</b> ${doctor.doctorsFee}</p>
      </div>

      {/* Edit and Delete buttons */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={onEdit} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007BFF', 
            color: '#FFF', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            marginRight: '10px' 
          }}
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#FF5733', 
            color: '#FFF', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorDetail;
