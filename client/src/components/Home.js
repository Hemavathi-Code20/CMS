import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'patient') {
      navigate('/register'); // Redirect patients to registration page
    } else {
      navigate('/login', { state: { role } }); // Redirect admin and doctor to login page
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Clinic Management System</h1>
      <p>Select your role to proceed:</p>
      <div style={{ margin: '20px' }}>
        <button onClick={() => handleSelect('admin')} style={buttonStyle}>
          Login as Admin
        </button>
        <button onClick={() => handleSelect('doctor')} style={buttonStyle}>
          Login as Doctor
        </button>
        <button onClick={() => handleSelect('patient')} style={buttonStyle}>
          Register/Login as Patient
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007BFF',
  color: '#FFF',
  border: 'none',
  borderRadius: '5px',
};

export default Home;
