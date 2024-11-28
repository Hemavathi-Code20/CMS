import React from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor Dashboard</h1>
      <p>Manage your patient appointments and records here.</p>
      
      <div>
        <Link to="/appointments">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px 0",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            View Appointments
          </button>
        </Link>
      </div>

      <div>
        <Link to="/doctor-dashboard/manage-record">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px 0",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Manage Patient Records
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
