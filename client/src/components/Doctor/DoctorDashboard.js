import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import doctorbg from "../../assets/bg-doctor.jpeg";
import "./styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);  // This holds the list of patients
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of patients
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctor/patients"); // Correct the URL if needed
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patient list.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // This will run once on component mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { state: { role: "doctor" } });
  };

  return (
    <div className="doctor-dashboard">
      <div className="doctor-bg-image">
        <img src={doctorbg} alt="Doctor Background" className="doctor-bgimg" />
      </div>
      <nav className="doctor-navbar">
        <div className="doctor-logo">
          <img src={logo} alt="Logo" className="doctor-logo" />
        </div>
        <div className="doctor-navbar-links">
          <Link to="/appointments">View Appointments</Link>
          <Link to="/doctor-dashboard/manage-record">
            Manage Patient Records
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="doctor-content">
        <h1>Welcome to the Doctor Dashboard</h1>

        <section className="patient-list">
          <h2>Patient List</h2>
          {loading ? (
            <p>Loading patients...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <ul>
              {patients.map((patient) => (
                <li key={patient.patientId}>
                  <Link to={`/doctor/patient/${patient.patientId}`}>
                    {patient.fullname}'s Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorDashboard;
