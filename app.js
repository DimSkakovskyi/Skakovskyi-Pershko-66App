import express from 'express';
import { AppDataSource } from './config/ormconfig';

const app = express();

// Підключення до бази даних
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Database connection error:', error));

// Middleware та інші налаштування
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});