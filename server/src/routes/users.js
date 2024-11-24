import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.query().insert({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// Update a user
router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await User.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// Delete a user
router.delete('/:id', async (req, res, next) => {
  try {
    const numDeleted = await User.query().deleteById(req.params.id);
    if (numDeleted === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;