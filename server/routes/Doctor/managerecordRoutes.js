import express from "express";
const router = express.Router();
import DoctorRecord from "../../models/Doctor/ManageRecord.js";

// Create a new record
router.post("/managerecords", async (req, res) => {
  try {
    const newRecord = new DoctorRecord(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all records
router.get("/managerecords", async (req, res) => {
  try {
    const records = await DoctorRecord.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a record
router.put("/managerecords/:id", async (req, res) => {
  try {
    const updatedRecord = await DoctorRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a record
router.delete("/managerecords/:id", async (req, res) => {
  try {
    await DoctorRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Record deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
