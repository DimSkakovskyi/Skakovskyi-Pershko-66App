import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.query();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { user_id, title, description, status } = req.body;
    const newTask = await Task.query().insert({ user_id, title, description, status });
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// Update a task
router.put('/:id', async (req, res, next) => {
  try {
    const updatedTask = await Task.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const numDeleted = await Task.query().deleteById(req.params.id);
    if (numDeleted === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;