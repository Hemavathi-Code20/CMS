import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import doctorbg from "../../assets/bg-doctor.jpeg";
import "./styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login", { state: { role: "doctor" } }); // Navigate to the login page for the doctor
  };

  return (
    <div className="doctor-dashboard">
      <div className="doctor-bg-image">
        <img src={doctorbg} alt="home-bg" className="doctor-bgimg" />
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
    </div>
  );
};

export default DoctorDashboard;
