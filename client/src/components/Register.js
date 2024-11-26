import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ patientId: '', username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Registration successful! Redirecting to login...');
      // Redirect to login page after successful registration
      setTimeout(() => navigate('/login', { state: { role: 'patient' } }), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Patient Registration</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ marginTop: '20px' }}>
        <p>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
