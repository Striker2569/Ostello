const express = require('express');
// ... other require statements
require('dotenv').config({ path: 'user-management-api/.env' });// To load environment variables

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.AWS_DB_NAME,
  process.env.AWS_DB_USERNAME,
  process.env.AWS_DB_PASSWORD,
  {
    host: process.env.AWS_DB_HOST,
    port: process.env.AWS_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000 // milliseconds, so 60 seconds
      }
  }
);


const app = express();

// ... Middleware, Routes

// Test DB Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// ... App listen logic
console.log(process.env.AWS_DB_HOST)