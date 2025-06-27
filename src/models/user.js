// models/User.js
const { DataTypes } = require('sequelize');

const sequelize = require('../db/pool'); // Ensure your Sequelize connection is properly set up

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment ID for primary key
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false, // This is a required field
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false, // This is a required field
    unique: true, // Ensure the email is unique in the database
    validate: {
      isEmail: true, // Validates that the field contains a valid email address
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false, // This is a required field
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false, // This is a required field
    defaultValue: 'patient', // Default value for the role
    validate: {
      isIn: [['patient', 'doctor']], // Role must be either 'patient' or 'doctor'
    },
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: true, // Only doctors have specialization, so it's optional
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current timestamp
  },
}, {
  tableName: 'users', // Specifies the table name in the database
  timestamps: false, // We are not using Sequelize's default `createdAt` and `updatedAt` columns
});

module.exports = User;
