import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import config from '../config/dotenv.js';

// Default users
const users = [
  { username: 'admin', password: bcrypt.hashSync('password', 10), role: 'admin' },
  { username: 'doctor', password: bcrypt.hashSync('password', 10), role: 'doctor' },
];

// Initialize default users
export const initializeUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany(users);
    console.log('Default admin and doctor initialized.');
  }
};

// Patient registration
export const registerPatient = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role: 'patient' });
  await newUser.save();

  res.status(201).json({ message: 'Patient registered successfully' });
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
};
