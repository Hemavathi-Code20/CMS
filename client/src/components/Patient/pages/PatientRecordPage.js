import React from "react";
import PatientRecord from "../Components/PatientRecord";

const PatientRecordPage = ({ patientId }) => {
  return (
    <div>
      <h1>Patient Records</h1>
      <PatientRecord patientId={patientId} />
    </div>
  );
};

export default PatientRecordPage;
