import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/PatientList.css"; // Make sure to add styles for card and animations

const PatientList = () => {
  const [patients, setPatients] = useState([]); // This holds the list of patients
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctor/patients"
        ); // Correct the URL if needed
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patient list.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="doctor-content">
      <h1>Patient List</h1>

      <section className="patient-list">
        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="patient-cards">
            {patients.map((patient) => (
              <div key={patient.patientId} className="patient-card">
                <h3>{patient.fullname}</h3>
                <p>
                  <strong>Patient ID:</strong> {patient.patientId}
                </p>
                <Link
                  to={`/doctor/patient/${patient.patientId}`}
                  className="view-details"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PatientList;
