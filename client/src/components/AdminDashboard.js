import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  const handleNavigateToDoctorManagement = () => {
    navigate("/doctor-management");
  };
  const handleNavigateToManageAppointments = () => {
    navigate("/manage-appointments");
  };
  const handleNavigateToInventoryManagement = () => {
    navigate("/inventory-management");
  };
  const handleNavigateToMaintenanceManagement = () => {
    navigate("/maintenance-management");
  };


  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>You have access to manage users and view system statistics.</p>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleNavigateToDoctorManagement}
        >
          Manage Doctors
        </button>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleNavigateToManageAppointments}
        >
          Manage appointments
        </button>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleNavigateToInventoryManagement}
        >
          Inventory
        </button>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleNavigateToMaintenanceManagement}
        >
          Maintenance management
        </button>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#DC3545",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
