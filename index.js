const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

const authRoutes = require('./src/routes/authRoutes');  // Import authentication routes
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const availabilityRoutes = require("./src/routes/availabilityRoutes");
const userRoutes = require("./src/routes/authRoutes");
const slotRoutes = require("./src/routes/availabilityRoutes");
const sequelize = require('./db/pool');          // Database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Only this middleware is needed to parse JSON bodies for POST/PUT requests, etc.

// Routes
app.use('/api/auth', authRoutes);  // Register authentication routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/slots", slotRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Clinic Appointment API is running');
});

// Sync the database and start the server
sequelize.sync({ force: false }) // Set `force: true` to drop tables on restart (not recommended in production)
  .then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
