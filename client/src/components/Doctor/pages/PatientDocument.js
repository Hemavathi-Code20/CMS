import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PatientDocument.css";

const PatientDocument = () => {
  const { id } = useParams(); // Get patient ID from URL parameters
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="patient-document">
      <h1 style={{ textAlign: "center", color: "teal" }}>Patient Details</h1>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Patient ID:</strong>
                  </td>
                  <td>{patientData.patientId}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Full Name:</strong>
                  </td>
                  <td>{patientData.fullname}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Age:</strong>
                  </td>
                  <td>{patientData.age || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Gender:</strong>
                  </td>
                  <td>{patientData.gender || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone:</strong>
                  </td>
                  <td>{patientData.phone || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{patientData.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Location:</strong>
                  </td>
                  <td>{`${patientData.location.city || ""}, ${
                    patientData.location.state || ""
                  }, ${patientData.location.country || ""}`}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Blood Type:</strong>
                  </td>
                  <td>{patientData.bloodType}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Occupation:</strong>
                  </td>
                  <td>{patientData.occupation || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>General Doctor:</strong>
                  </td>
                  <td>{patientData.generalDoctorName || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Doctor Specialty:</strong>
                  </td>
                  <td>{patientData.doctorSpeciality || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Insurance:</strong>
                  </td>
                  <td>
                    {patientData.insuranceInformation.provider
                      ? `${patientData.insuranceInformation.provider} (Policy #: ${patientData.insuranceInformation.policyNumber})`
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Address:</strong>
                  </td>
                  <td>{patientData.address || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Medical History:</strong>
                  </td>
                  <td> {patientData.medicalHistory || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Prescribed Medication:</strong>
                  </td>
                  <td>{patientData.medications || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDocument;
