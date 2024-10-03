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