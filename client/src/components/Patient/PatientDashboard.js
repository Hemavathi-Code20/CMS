import React from "react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Your Patient Dashboard</h1>
      <p>Access your appointments, view medical records, and book new appointments.</p>
      
      <div>
        <Link to="/book-appointment">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px 0",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Book Appointment
          </button>
        </Link>
      </div>

      <div>
        <Link to="/patient-dashboard/view-record">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px 0",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            View Medical Records
          </button>
        </Link>
      </div>

      <div>
        <Link to="/patient-dashboard/edit-profile">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px 0",
              backgroundColor: "#FFA500",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
