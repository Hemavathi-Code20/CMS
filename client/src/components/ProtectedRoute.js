import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  if (!token) return <Navigate to="/login" />;

  try {
    // Parse the token to get the role from the payload
    const userRole = JSON.parse(atob(token.split('.')[1])).role;

    // If the user's role does not match the required role, redirect to login
    if (userRole !== role) return <Navigate to="/login" />;
  } catch (error) {
    // In case of any error (like malformed token), redirect to login
    return <Navigate to="/login" />;
  }

  // If the token is valid and the role matches, render the protected children
  return children;
};

export default ProtectedRoute;
