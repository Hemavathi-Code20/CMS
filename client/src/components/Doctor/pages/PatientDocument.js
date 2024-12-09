import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/PatientDocument.css";

const PatientDocument = () => {
  const { patientId } = useParams(); // Get the patient ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/profile/${patientId}`
        );
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        // Provide a more specific error message if possible
        setError(err.response?.data?.message || "Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  // Provide default values in case the nested data doesn't exist
  const location = profile.location || {};
  const insurance = profile.insuranceInformation || {};

  return (
    <div className="doctor-patient-profile">
      <h1>Patient Profile</h1>
      <div className="profile-info">
        <div className="field">
          <strong>Patient ID:</strong> {profile.patientId}
        </div>
        <div className="field">
          <strong>Name:</strong> {profile.fullname}
        </div>
        <div className="field">
          <strong>Age:</strong> {profile.age || "N/A"}
        </div>
        <div className="field">
          <strong>Gender:</strong> {profile.gender}
        </div>
        <div className="field">
          <strong>Phone:</strong> {profile.phone || "N/A"}
        </div>
        <div className="field">
          <strong>Email:</strong> {profile.email}
        </div>
        <div className="field">
          <strong>Location:</strong>{" "}
          {`${location.city || "N/A"}, ${location.state || "N/A"}, ${location.country || "N/A"}`}
        </div>
        <div className="field">
          <strong>Occupation:</strong> {profile.occupation || "N/A"}
        </div>
        <div className="field">
          <strong>Blood Type:</strong> {profile.bloodType}
        </div>
        <div className="field">
          <strong>General Doctor:</strong> {profile.generalDoctorName || "N/A"}
        </div>
        <div className="field">
          <strong>Doctor Specialty:</strong> {profile.doctorSpeciality || "N/A"}
        </div>
        <div className="field">
          <strong>Insurance:</strong> 
          {insurance.provider
            ? `${insurance.provider} (Policy # ${insurance.policyNumber})`
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default PatientDocument;
