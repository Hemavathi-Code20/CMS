const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer'); // Add multer for file uploads
const userRoutes = require('./routes/userRoutes');
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes"); // Import appointment routes
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Setup multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' folder

// Routes
app.use('/api/users', userRoutes); // user routes
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/appointments", appointmentRoutes); // Add appointment routes
app.use("/api/admin", adminRoutes); // Fix the admin route

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
