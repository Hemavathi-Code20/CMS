import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import logo from "../assets/logo.png";
import homebg from "../assets/home-bg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (role) => {
    if (role === "admin") {
      navigate("/login", { state: { role: "admin" } });
    } else if (role === "doctor") {
      navigate("/login", { state: { role: "doctor" } });
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="home-container">
      <div className="background-image">
        <img src={homebg} alt="home-bg" className="home-img" />
      </div>

      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-buttons">
          <button onClick={toggleDropdown} className="login-button">
            Login
          </button>

          {dropdownVisible && (
            <div className="dropdown">
              <button type="button" onClick={() => handleSelect("admin")}>
                As Admin
              </button>
              <button type="button" onClick={() => handleSelect("doctor")}>
                As Doctor
              </button>
            </div>
          )}

          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Register
          </button>
        </div>
      </div>

      <div className="center-container">
        <h1>Clinic Management System</h1>
        <p>
          Manage your clinic with ease, whether you're a patient or a healthcare
          provider.
        </p>
      </div>
    </div>
  );
};

export default Home;