const express = require("express");
const { createDoctor } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/doctor", authMiddleware("admin"), createDoctor);

module.exports = router;
