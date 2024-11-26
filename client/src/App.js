import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorManagement from "./components/Admin/pages/DoctorManagement";
import ManageAppointments from "./components/Admin/pages/ManageAppointments"; // Adding this as an example route
import InventoryPage from "./components/Admin/pages/InventoryPage";
import MaintenancePage from "./components/Admin/pages/MaintenancePage";
import RolesManagement from "./components/Admin/pages/RolesManagement";
import AppointmentPage from "./components/Doctor/pages/AppointmentPage";
import BookAppointmentPage from "./components/Patient/pages/BookAppointmentPage";
import ManageRecordPage from "./components/Doctor/pages/ManageRecordPage";
import PatientRecordPage from "./components/Patient/pages/PatientRecordPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/doctor-management"
          element={
            <ProtectedRoute role="admin">
              <DoctorManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-appointments"
          element={
            <ProtectedRoute role="admin">
              <ManageAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory-management"
          element={
            <ProtectedRoute role="admin">
              <InventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance-management"
          element={
            <ProtectedRoute role="admin">
              <MaintenancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles-management"
          element={
            <ProtectedRoute role="admin">
              <RolesManagement />
            </ProtectedRoute>
          }
        />

        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route
          path="/doctor-dashboard/manage-record"
          element={<ManageRecordPage />} // Route for ManageRecordPage (Doctor)
        />
        <Route
          path="/patient-dashboard/view-record"
          element={<PatientRecordPage />} // Route for PatientRecordPage (Patient)
        />
        {/* Redirect to login if route is not found */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
