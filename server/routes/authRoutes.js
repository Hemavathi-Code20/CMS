import express from 'express';
import { login, registerPatient } from '../controllers/authController.js';

const router = express.Router();

// Login endpoint
router.post('/login', login);

// Patient registration endpoint
router.post('/register', registerPatient);

export default router;
