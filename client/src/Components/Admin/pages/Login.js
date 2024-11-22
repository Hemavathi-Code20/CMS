import React, { useState } from "react";
import "../styles/Login.css";
import leftimg from "../assets/l.jpg";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      const token = "dummyAuthToken";
      onLogin(token);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-side">
          <img src={leftimg} alt="" />
        </div>
        <div className="right-side">
          <div className="login-form">
            <h2>Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
