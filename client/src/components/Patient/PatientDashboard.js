import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientId = localStorage.getItem('patientId') || 'PAT0000001'; // Replace with secure token retrieval

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/profile/${patientId}`);
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [patientId]);

  const buttonStyle = (bgColor) => ({
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px 0',
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>No profile found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {profile.name || 'Patient'}</h1>
      <p>Access your appointments, view medical records, and manage your profile.</p>

      <div>
        <Link to="/book-appointment" style={buttonStyle('#4CAF50')}>
          Book Appointment
        </Link>
      </div>

      <div>
        <Link to="/patient-dashboard/view-record" style={buttonStyle('#008CBA')}>
          View Medical Records
        </Link>
      </div>

      <div>
        <Link to={`/patient/profile/${profile.patientId}/edit`} style={buttonStyle('#FFA500')}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
