import React from "react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div>
      <h1>Welcome to Patient Dashboard</h1>
      <p>Access your appointments and schedule new ones.</p>
      <Link to="/book-appointment">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Book Appointment
        </button>
      </Link>
    </div>
  );
};

export default PatientDashboard;
