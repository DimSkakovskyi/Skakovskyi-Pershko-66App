import express from 'express';
import PomodoroSession from '../models/PomodoroSession.js'; 

const router = express.Router();

// Create a Pomodoro session
router.post('/', async (req, res, next) => {
  try {
    const { user_id, work_duration, break_duration, number_of_streaks, stop_time } = req.body;

    // Insert a new Pomodoro session into the database
    const session = await PomodoroSession.query().insert({
      user_id,
      work_duration,
      break_duration,
      number_of_streaks,
      session_date: stop_time,
    });

    res.status(201).json({
      message: 'Session saved successfully',
      session,
    });
  } catch (err) {
    next(err); // Forward the error to centralized error handling middleware
  }
});

export default router;