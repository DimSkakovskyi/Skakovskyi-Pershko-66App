import express from 'express';
import PomodoroSession from '../models/PomodoroSession.js'; // Ensure the PomodoroSession model is imported

const router = express.Router();

// Create a Pomodoro session
router.post('/', async (req, res, next) => {
  try {
    const { user_id, work_duration, break_duration, number_of_streaks, stop_time } = req.body;
    const session = await PomodoroSession.query().insert({
      user_id,
      work_duration,
      break_duration,
      number_of_streaks,
      session_date: stop_time,
    });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

export default router;