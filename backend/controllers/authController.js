import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/db.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

export async function signup(req, res) {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if user already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
    }

    if (user) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.run(
        'INSERT INTO users (fullName, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
        [fullName, email, phone, hashedPassword, 'member'],
        function (err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
          }

          const newUser = {
            id: this.lastID,
            fullName,
            email,
            role: 'member',
          };

          const token = signToken(newUser);
          const data = {
            id: newUser.id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            token,
          };

          res.status(201).json({ success: true, message: 'Account created successfully', data });
        }
      );
    } catch (error) {
      res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Login failed', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user);
    const data = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
    };
    res.json({ success: true, message: 'Login successful', data });
  });
}
