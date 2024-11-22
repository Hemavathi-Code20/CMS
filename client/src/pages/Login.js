import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const defaultCredentials = {
    admin: { username: "admin", password: "password" },
    doctor: { username: "doctor", password: "password" },
    patient: { username: "patient", password: "password" },
  };

  const [role, setRole] = useState("admin");
  const [credentials, setCredentials] = useState(defaultCredentials.admin);
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setCredentials(defaultCredentials[selectedRole]); // Set default credentials for selected role
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${role}`, credentials);

    // You can perform an API call here for real authentication
    // If authentication is successful, redirect to the appropriate dashboard:
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "doctor") {
      navigate("/doctor");
    } else if (role === "patient") {
      navigate("/patient");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select value={role} onChange={handleRoleChange}>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
