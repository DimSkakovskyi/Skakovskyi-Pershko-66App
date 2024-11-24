import express from 'express';
import Habit from '../models/Habit.js';

const router = express.Router();

// Create a new habit
router.post('/', async (req, res, next) => {
  try {
    const { user_id, title, description, status } = req.body;
    const newHabit = await Habit.query().insert({ user_id, title, description, status });
    res.status(201).json(newHabit);
  } catch (err) {
    next(err);
  }
});

export default router;