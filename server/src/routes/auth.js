import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';

const router = express.Router();
const saltRounds = 12;

// Rate Limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'Too many attempts, please try again later.',
});

// Registration Route
router.post(
  '/register',
  authLimiter,
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
      });
    }

    const { email, password, username, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.query().insert({ email, password: hashedPassword, username, role });

      res.status(201).json({
        success: true,
        message: 'Registration successful.',
        user: { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Login Route
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.query().findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h', audience: 'your-audience', issuer: 'your-issuer' }
      );

      res.json({
        success: true,
        message: 'Login successful.',
        token,
        user: { id: user.id, email: user.email, username: user.username, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

export default router;
