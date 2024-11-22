import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import api from '../api/api';
import './usermanagement.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [viewUser, setViewUser] = useState(null); // New state to handle view user details

  // Fetch all users from API
  const fetchUsers = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  // Handle adding/updating user
  const handleAddUser = async (user) => {
    try {
      if (editUser) {
        await api.updateUser(editUser._id, user);
        setSuccessMessage('User updated successfully!');
      } else {
        await api.addUser(user);
        setSuccessMessage('User added successfully!');
      }
      fetchUsers();
      setEditUser(null);
      setModalOpen(false); // Close the modal after submission
    } catch (error) {
      setErrorMessage('An error occurred while saving the user.');
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    await api.deleteUser(id);
    fetchUsers();
  };

  // Open the modal and set the selected category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalOpen(true); // Open modal when category is selected
  };

  // Open user details in view mode
  const handleViewUser = (user) => {
    setViewUser(user);
    setModalOpen(true); // Open modal to view details
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>

      {/* Add Record Button with Dropdown for Categories */}
      <div>
        <button onClick={() => setModalOpen(true)}>ADD RECORDS</button>

        {modalOpen && (
          <div className="dropdown">
            <select
              onChange={(e) => handleCategorySelect(e.target.value)}
              value={selectedCategory}
            >
              <option value="">Select Category</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Staff">Staff</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>

      {/* Success and Error Messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Show Modal if modalOpen is true */}
      {modalOpen && selectedCategory && !viewUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <UserForm
              onSubmit={handleAddUser}
              initialData={editUser || {}}
              selectedCategory={selectedCategory}
              categories={['Doctor', 'Nurse', 'Staff', 'Other']}
            />
          </div>
        </div>
      )}

      {/* View User Details Modal */}
      {viewUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h3>User Details</h3>
            <p><strong>Full Name:</strong> {viewUser.fullName}</p>
            <p><strong>Gender:</strong> {viewUser.gender}</p>
            <p><strong>Age:</strong> {viewUser.age}</p>
            <p><strong>Contact Number:</strong> {viewUser.contactNumber}</p>
            <p><strong>Email Address:</strong> {viewUser.emailAddress}</p>
            <p><strong>Joined Date:</strong> {viewUser.joinedDate}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <p><strong>Years of Experience:</strong> {viewUser.yearsOfExperience}</p>
            {viewUser.specialization && <p><strong>Specialization:</strong> {viewUser.specialization}</p>}
            {viewUser.clinicTimings && <p><strong>Clinic Timings:</strong> {viewUser.clinicTimings}</p>}
            {viewUser.consultationFee && <p><strong>Consultation Fee:</strong> {viewUser.consultationFee}</p>}
            {viewUser.workSchedule && <p><strong>Work Schedule:</strong> {viewUser.workSchedule}</p>}
          </div>
        </div>
      )}

      {/* User Records Table */}
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td><img src={user.profilePicture} alt="Profile" /></td>
              <td>{user.fullName}</td>
              <td>{user.category}</td>
              <td>
                <button onClick={() => { setEditUser(user); setSelectedCategory(user.category); setModalOpen(true); }}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                <button onClick={() => handleViewUser(user)}>View</button> {/* View button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
