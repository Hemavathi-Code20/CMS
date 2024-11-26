import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import config from '../config/dotenv.js';

// Default users for admin and doctor
const users = [
  { username: 'admin', password: bcrypt.hashSync('password', 10), role: 'admin' },
  { username: 'doctor', password: bcrypt.hashSync('password', 10), role: 'doctor' },
];

// Initialize default users (admin and doctor) if they don't exist
export const initializeUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany(users);
    console.log('Default admin and doctor initialized.');
  }
};

// Patient registration
export const registerPatient = async (req, res) => {
  const { patientId, username, password } = req.body;

  // Check if all required fields for patient are provided
  if (!patientId || !username || !password) {
    return res.status(400).json({ message: 'Patient ID, username, and password are required' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new patient user
  const newUser = new User({
    patientId,
    username,
    password: hashedPassword,
    role: 'patient',
  });

  await newUser.save();
  res.status(201).json({ message: 'Patient registered successfully' });
};

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token for login
  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
};
