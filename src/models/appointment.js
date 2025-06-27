const { DataTypes } = require("sequelize");
const sequelize = require("../db/pool");
const User = require("./user");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "appointments",
    timestamps: false,
  }
);

// 👇 Define correct association hereA
Appointment.belongsTo(User, {
  foreignKey: "doctor_id",
  as: "doctor",
});

Appointment.belongsTo(User, {
  foreignKey: "patient_id",
  as: "patient",
});




module.exports = Appointment;
