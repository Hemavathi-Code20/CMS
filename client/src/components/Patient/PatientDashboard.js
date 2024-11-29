import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the patient's ID from local storage or a context provider
  const patientId = localStorage.getItem('patientId') || 'PAT0000001'; // Replace with secure token retrieval

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/profile/${patientId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [patientId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <p>No profile found.</p>; // Handle the case where profile data is not returned
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Your Patient Dashboard</h1>
      <p>Access your appointments, view medical records, and book new appointments.</p>

      <div>
        <Link to="/book-appointment">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px 0',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Book Appointment
          </button>
        </Link>
      </div>

      <div>
        <Link to="/patient-dashboard/view-record">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px 0',
              backgroundColor: '#008CBA',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            View Medical Records
          </button>
        </Link>
      </div>

      <div>
        <Link to={`/patient/profile/${profile.patientId}/edit`}>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px 0',
              backgroundColor: '#FFA500',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
