const User = require("../models/admin");

const createDoctor = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newDoctor = await User.create({ username, password, role: "doctor" });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDoctor };
