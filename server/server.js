import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import { initializeUsers } from "./controllers/authController.js";
import config from "./config/dotenv.js";
import doctorRoutes from "./routes/Admin/doctorRoutes.js";
import appointmentRoutes from "./routes/Admin/appointmentRoutes.js";
import inventoryRoutes from "./routes/Admin/inventoryRoutes.js";
import maintenanceRoutes from "./routes/Admin/maintenanceRoutes.js";
import roleRoutes from "./routes/Admin/roleRoutes.js";

const app = express();

// Set up CORS with specific origin and methods
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Increase JSON payload size limit to handle large image uploads or data
app.use(express.json({ limit: "10mb" })); // Adjust size limit if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Initialize users (if needed)
    await initializeUsers();

    // Set up routes
    app.use("/api/auth", authRoutes);
    app.use("/api/admin/doctors", doctorRoutes); // Doctor management routes
    app.use("/api/admin/appointments", appointmentRoutes); // Appointment routes
    app.use("/api/admin/inventory", inventoryRoutes); // Inventory routes
    app.use("/api/admin/maintenance", maintenanceRoutes);
    app.use("/api/admin/roles", roleRoutes);

    // Start server
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
