import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientRecord = ({ patientId }) => {
  const [patientRecord, setPatientRecord] = useState(null);

  useEffect(() => {
    const fetchPatientRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patient/patientrecords/${patientId}`);
        setPatientRecord(response.data);
      } catch (error) {
        console.error("Error fetching patient record:", error);
      }
    };
    fetchPatientRecord();
  }, [patientId]);

  if (!patientRecord) return <div>Loading...</div>;

  return (
    <div>
      <h2>Patient Record</h2>
      <p>Full Name: {patientRecord.fullName}</p>
      <p>Treatment Plan: {patientRecord.treatmentPlan}</p>
      {/* Display other fields as needed */}
    </div>
  );
};

export default PatientRecord;
