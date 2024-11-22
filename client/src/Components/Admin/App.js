import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserManagementPage from "./pages/UserManagementPage";
import InventoryPage from "./pages/InventoryPage";
import MaintenanceScheduleForm from "./components/MaintenanceScheduleForm";
import MaintenanceTracker from "./pages/MaintenanceTracker";
import { AppointmentForm,AppointmentList } from "./components/Appointment";
import EditAppointmentForm from "./components/EditAppointment";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login after logout
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <div>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Authenticated Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
           
              {/* Maintenance Routes */}
              <Route path="/maintenance/schedule" element={<MaintenanceScheduleForm />} />
            <Route path="/maintenance/tracker" element={<MaintenanceTracker />} />

            {/* Appointment Routes */}
            <Route path="/appointments" element={<AppointmentList />} /> {/* Appointment List Route */}
            <Route path="/appointments/add" element={<AppointmentForm />} /> {/* Add Appointment Route */}
            <Route path="/appointments/edit/:id" element={<EditAppointmentForm />} /> {/* Edit Appointment Route */}
          
          </>
        ) : (
          // Redirect unauthenticated users to login page
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
