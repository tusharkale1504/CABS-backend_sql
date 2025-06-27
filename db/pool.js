// db/pool.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'CABS',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'your_mysql_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set true for query logging
  }
);

module.exports = sequelize;
