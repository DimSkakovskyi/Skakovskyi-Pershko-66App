import express from 'express';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Example protected route
router.get('/profile', auth, (req, res) => {
  res.json({
    message: `Welcome, user with ID ${req.user.id}`,
    role: req.user.role,
  });
});

// Example admin-only route
router.get('/admin', auth, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access Forbidden' });
  }
  res.json({ message: 'Welcome, Admin!' });
});

export default router;
