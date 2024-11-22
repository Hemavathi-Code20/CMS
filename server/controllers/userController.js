const User = require('../models/UserModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    if (req.file) {
      newUser.profilePicture = req.file.path; // Store the file path in the database
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    console.log('Uploaded file:', req.file); // Log the uploaded file (if any)

    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.profilePicture = req.file.path; // Store the file path in the database
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error during update:', error); // Log the error
    res.status(400).json({ message: error.message });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
