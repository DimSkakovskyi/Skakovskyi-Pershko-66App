import express from 'express';
import { AppDataSource } from './config/ormconfig';

const { Model } = require('objection');
const knex = require('knex');
const knexConfig = require('./knexfile');
const app = express();

const db = knex(knexConfig.development);
Model.knex(db);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Database connection error:', error));

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.query().insert({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const numDeleted = await User.query().deleteById(req.params.id);
    if (numDeleted === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.query().withGraphFetched('user');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { user_id, title, description, status } = req.body;
    const newTask = await Task.query().insert({ user_id, title, description, status });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const numDeleted = await Task.query().deleteById(req.params.id);
    if (numDeleted === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/habits', async (req, res) => {
  try {
    const { user_id, title, description, status } = req.body;
    const newHabit = await Habit.query().insert({ user_id, title, description, status });
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/pomodoro_sessions', async (req, res) => {
  try {
    const { user_id, work_duration, break_duration, number_of_streaks, stop_time } = req.body;
    const session = await PomodoroSession.query().insert({
      user_id,
      work_duration,
      break_duration,
      number_of_streaks,
      session_date: stop_time, // Assuming stop_time is passed as session date
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
