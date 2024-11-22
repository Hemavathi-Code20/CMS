const express = require("express");
const {
  addAppointment,
  getAppointments,
  getAppointmentById,
  modifyAppointment,
  markCompleted,
  markUpcoming,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/add", addAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.put("/modify/:id", modifyAppointment);
router.put("/completed/:id", markCompleted);
router.put("/upcoming/:id", markUpcoming);

module.exports = router;
