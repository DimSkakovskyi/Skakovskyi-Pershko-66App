router.post('/pomodoro-sessions', authMiddleware, async (req, res) => {
    const { startTime, endTime, duration } = req.body;
    const userId = req.user.id;
  
    try {
      await db('pomodoro_sessions').insert({
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
        duration,
      });
      res.status(201).json({ message: 'Session saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error saving session' });
    }
  });
  