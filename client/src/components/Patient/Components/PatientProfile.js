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

        setProfile(data);
        setEditFormData({
          fullname: data.fullname || "",
          preferredPronouns: data.preferredPronouns || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phone || "",
          email: data.email || "",
          city: data.location.city || "",
          state: data.location.state || "",
          country: data.location.country || "",
          occupation: data.occupation || "",
          generalDoctor: data.generalDoctorName || "",
          doctorSpecialty: data.doctorSpeciality || "",
          insuranceProvider: data.insuranceInformation.provider || "",
          policyNumber: data.insuranceInformation.policyNumber || "",
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

      // Format the location and insurance as objects before sending
      const updatedData = {
        ...editFormData,
        location: {
          city: editFormData.city,
          state: editFormData.state,
          country: editFormData.country,
        },
        insuranceInformation: {
          provider: editFormData.insuranceProvider,
          policyNumber: editFormData.policyNumber,
        },
      };

      // Send the update request
      const response = await axios.put(
        `http://localhost:5000/api/patient/profile/${profile.patientId}`,
        updatedData
      );

      console.log("Response from server:", response.data);

      // Update state with the new data
      if (response.status === 200) {
        // Fetch the updated profile to ensure frontend reflects backend changes
        const updatedProfileResponse = await axios.get(
          `http://localhost:5000/api/patient/profile/${profile.patientId}`
        );
        setProfile(updatedProfileResponse.data);
        setIsModalOpen(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
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
      <p>Patient ID: {profile.patientId}</p>
      <p>Full Name: {profile.fullname}</p>
      <p>Preferred Pronouns: {profile.preferredPronouns || "Not provided"}</p>
      <p>Age: {profile.age || "Not provided"}</p>
      <p>Gender: {profile.gender || "Not provided"}</p>
      <p>Contact Number: {profile.phone || "Not provided"}</p>
      <p>Email: {profile.email || "Not provided"}</p>
      <p>Location: {`${profile.location.city || "Not provided"}, ${profile.location.state || "Not provided"}, ${profile.location.country || "Not provided"}`}</p>
      <p>Occupation: {profile.occupation || "Not provided"}</p>
      <p>General Doctor: {profile.generalDoctorName || "Not provided"}</p>
      <p>Doctor Specialty: {profile.doctorSpeciality || "Not provided"}</p>
      <p>
        Insurance: {profile.insuranceInformation.provider && profile.insuranceInformation.policyNumber
          ? `${profile.insuranceInformation.provider} (Policy #${profile.insuranceInformation.policyNumber})`
          : "Not provided"}
      </p>
      <div>
        <h3>Appointment Dates</h3>
        {profile.appointmentDates && profile.appointmentDates.length > 0 ? (
          <ul>
            {profile.appointmentDates.map((date, index) => (
              <li key={index}>{new Date(date.date).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>No appointment dates available.</p>
        )}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{ margin: "10px", padding: "5px 10px", background: "blue", color: "white" }}
      >
        Edit Profile
      </button>

      {/* Modal for profile editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Profile"
      >
        <h2>Edit Profile</h2>
        <form>
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={editFormData.fullname}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Preferred Pronouns:
            <input
              type="text"
              name="preferredPronouns"
              value={editFormData.preferredPronouns}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={editFormData.age}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={editFormData.gender}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              value={editFormData.city}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            State:
            <input
              type="text"
              name="state"
              value={editFormData.state}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={editFormData.country}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Occupation:
            <input
              type="text"
              name="occupation"
              value={editFormData.occupation}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            General Doctor:
            <input
              type="text"
              name="generalDoctor"
              value={editFormData.generalDoctor}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Doctor Specialty:
            <input
              type="text"
              name="doctorSpecialty"
              value={editFormData.doctorSpecialty}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Insurance Provider:
            <input
              type="text"
              name="insuranceProvider"
              value={editFormData.insuranceProvider}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Policy Number:
            <input
              type="text"
              name="policyNumber"
              value={editFormData.policyNumber}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <button type="button" onClick={handleUpdate}>
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PatientProfile;
