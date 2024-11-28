import express from "express";
const router = express.Router();
import PatientProfile from "../../models/Patient/PatientProfile.js";

// Fetch patient profile
router.get("/:patientId", async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ patientId: req.params.patientId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update patient profile
router.put("/:patientId", async (req, res) => {
  try {
    const updatedProfile = await PatientProfile.findOneAndUpdate(
      { patientId: req.params.patientId },
      req.body,
      { new: true }
    );

    if (!updatedProfile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
