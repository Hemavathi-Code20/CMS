const express = require('express');
const multer = require('multer');
const { getAllUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
  },
});

const upload = multer({ storage });

// Routes
router.get('/', getAllUsers); // Get all users
router.post('/', upload.single('profilePicture'), addUser); // Handle file upload for adding a user
router.put('/:id', upload.single('profilePicture'), updateUser); // Handle file upload for updating a user
router.delete('/:id', deleteUser); // Delete user

module.exports = router;
