import express from "express";
const router = express.Router();
import PatientRecord from "../../models/Patient/PatientRecord.js";

// Get patient records
router.get("/patientrecords/:id", async (req, res) => {
  try {
    const record = await PatientRecord.findOne({ patientId: req.params.id });
    res.status(200).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
