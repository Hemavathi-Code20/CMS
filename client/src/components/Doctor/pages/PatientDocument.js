import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDocument = () => {
  const { id } = useParams(); // Get patient ID from URL parameters
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctor/patient/${id}`
        );
        setPatientData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setError("Failed to fetch patient details.");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="patient-document">
      <h1 style={{ textAlign: "center", color: "teal" }}>Patient Details</h1>
      <div className="details-container">
        <p>
          <strong>Patient ID:</strong> {patientData.patientId}
        </p>
        <p>
          <strong>Full Name:</strong> {patientData.fullname}
        </p>
        <p>
          <strong>Age:</strong> {patientData.age || "N/A"}
        </p>
        <p>
          <strong>Gender:</strong> {patientData.gender || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {patientData.phone || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {patientData.email}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {`${patientData.location.city || ""}, ${
            patientData.location.state || ""
          }, ${patientData.location.country || ""}`}
        </p>
        <p>
          <strong>Blood Type:</strong> {patientData.bloodType}
        </p>
        <p>
          <strong>Occupation:</strong> {patientData.occupation || "N/A"}
        </p>
        <p>
          <strong>General Doctor:</strong>{" "}
          {patientData.generalDoctorName || "N/A"}
        </p>
        <p>
          <strong>Doctor Specialty:</strong>{" "}
          {patientData.doctorSpeciality || "N/A"}
        </p>
        <p>
          <strong>Insurance:</strong>{" "}
          {patientData.insuranceInformation.provider
            ? `${patientData.insuranceInformation.provider} (Policy #: ${patientData.insuranceInformation.policyNumber})`
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default PatientDocument;
