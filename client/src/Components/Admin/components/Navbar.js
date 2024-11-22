import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Clinic Logo" />
        </Link>

        {/* Add the new links below */}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/user-management" className="navbar-link">
                User Management
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="navbar-link">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="navbar-link">
                View appointment
              </Link>
            </li>
            <li>
              <Link to="/appointments/add" className="navbar-link">
                Add appointment
              </Link>
            </li>
            <li>
              <Link to="/maintenance/schedule">Schedule Maintenance</Link>
            </li>
            <li>
              <Link to="/maintenance/tracker">View Maintenance</Link>
            </li>
          </>
        )}

        {/* Add Logout Link if authenticated */}
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
