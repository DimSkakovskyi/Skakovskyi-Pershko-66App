import express from 'express';
import { AppDataSource } from './config/ormconfig';
import { Pool } from 'pg';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Database connection error:', error));

const pool = new Pool({
  user: 'your_db_user',           // Your PostgreSQL username
  host: 'localhost',              // Your PostgreSQL server address
  database: 'your_db_name',       // Your PostgreSQL database name
  password: 'your_db_password',   // Your PostgreSQL password
  port: 5432                      // Your PostgreSQL server port (default: 5432)
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const queryDB = async (query, params) => {
  const client = await pool.connect();
  try {
      const result = await client.query(query, params);
      return result;
  } finally {
      client.release();
  }
};

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await queryDB('SELECT * FROM users', []);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});