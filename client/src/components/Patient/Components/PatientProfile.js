import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PatientProfile = () => {
  const { id } = useParams(); // Get the patient ID from the route parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullname: "",
    preferredPronouns: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    generalDoctor: "",
    doctorSpecialty: "",
    insuranceProvider: "",
    policyNumber: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/profile/${id}`
        );
        const data = response.data;

        // Ensure appointmentDates is an array
        data.appointmentDates = Array.isArray(data.appointmentDates)
          ? data.appointmentDates
          : [];

        setProfile(data);
        setEditFormData({
          fullname: data.fullname,
          preferredPronouns: data.preferredPronouns || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phone || "",
          email: data.email,
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          occupation: data.occupation || "",
          generalDoctor: data.generalDoctor || "",
          doctorSpecialty: data.doctorSpecialty || "",
          insuranceProvider: data.insuranceProvider || "",
          policyNumber: data.policyNumber || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log("Update data being sent:", editFormData);
      const response = await axios.put(
        `http://localhost:5000/api/patient/profile/${profile.patientId}`,
        {
          ...editFormData,
        }
      );
      console.log("Response from server:", response.data);

      if (response.data) {
        setProfile(response.data);
        setIsModalOpen(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div>
      <h2>Patient Profile</h2>
      {/* Render profile information */}
      <p>Patient ID: {profile.patientId}</p> {/* Display the generated PATIENTID */}
      <p>Full Name: {profile.fullname}</p>
      <p>Preferred Pronouns: {profile.preferredPronouns}</p>
      <p>Age: {profile.age}</p>
      <p>Gender: {profile.gender}</p>
      <p>Contact Number: {profile.phone}</p>
      <p>Email: {profile.email}</p>
      <p>Location: {`${profile.city}, ${profile.state}, ${profile.country}`}</p>
      <p>Occupation: {profile.occupation}</p>
      <p>General Doctor: {profile.generalDoctor}</p>
      <p>Doctor Specialty: {profile.doctorSpecialty}</p>
      <p>
        Insurance: {`${profile.insuranceProvider} (Policy #${profile.policyNumber})`}
      </p>
      <div>
        <h3>Appointment Dates</h3>
        {/* Check if appointmentDates exists and is not empty before mapping */}
        {profile.appointmentDates && profile.appointmentDates.length > 0 ? (
          <ul>
            {profile.appointmentDates.map((date, index) => (
              <li key={index}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>No appointment dates available.</p>
        )}
      </div>
      {/* Edit button with pencil icon */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{ margin: "10px", cursor: "pointer" }}
      >
        ✏️ Edit
      </button>
      {/* Modal for editing profile details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Profile"
      >
        <h2>Edit Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={editFormData.fullname}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Preferred Pronouns:</label>
            <input
              type="text"
              name="preferredPronouns"
              value={editFormData.preferredPronouns}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={editFormData.age}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={editFormData.gender}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={editFormData.city}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={editFormData.state}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={editFormData.country}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={editFormData.occupation}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>General Doctor:</label>
            <input
              type="text"
              name="generalDoctor"
              value={editFormData.generalDoctor}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Doctor Specialty:</label>
            <input
              type="text"
              name="doctorSpecialty"
              value={editFormData.doctorSpecialty}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Insurance Provider:</label>
            <input
              type="text"
              name="insuranceProvider"
              value={editFormData.insuranceProvider}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <label>Policy Number:</label>
            <input
              type="text"
              name="policyNumber"
              value={editFormData.policyNumber}
              onChange={handleEditChange}
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PatientProfile;
