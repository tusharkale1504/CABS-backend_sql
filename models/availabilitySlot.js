const { DataTypes } = require("sequelize");
const sequelize = require("../db/pool");
const User = require("./user");

const AvailabilitySlot = sequelize.define("AvailabilitySlot", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  available_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: "availability_slots",
  timestamps: false,
});

AvailabilitySlot.belongsTo(User, {
  foreignKey: "doctor_id",
  as: "doctor"
});

module.exports = AvailabilitySlot;
