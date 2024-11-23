import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import authMiddleware from '../root/middleware/authMiddleware.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

const app = express();

// Initialize Knex and Objection.js
const db = knex(knexConfig.development);
Model.knex(db);

// Initialize Data Source (if using TypeORM)
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Database connection error:', error));

// Middleware
app.use(express.json()); // Parse JSON payloads

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api', authMiddleware, protectedRoutes); // Protected routes

// Health check for the API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example user routes with Objection.js
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

// Task routes
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

// Habit routes
app.post('/api/habits', async (req, res) => {
  try {
    const { user_id, title, description, status } = req.body;
    const newHabit = await Habit.query().insert({ user_id, title, description, status });
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pomodoro Session routes
app.post('/api/pomodoro_sessions', async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
