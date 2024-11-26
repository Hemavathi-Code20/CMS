import React from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Manage your patient appointments here.</p>
      <Link to="/appointments">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          View Appointments
        </button>
      </Link>
    </div>
  );
};

export default DoctorDashboard;
