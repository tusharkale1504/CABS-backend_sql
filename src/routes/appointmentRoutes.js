const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const appointmentController = require("../controllers/appointmentController");

// 👇 Put more specific routes ABOVE general routes
router.put(
  "/appointments/:doctorId/:appointmentId/status",
  authMiddleware,
  appointmentController.updateAppointmentStatusByDoctor
);

// Create a new appointment
router.post(
  "/appointments",
  authMiddleware,
  appointmentController.createAppointment
);

// Get appointments for a patient
router.get(
  "/appointments/:patientId",
  authMiddleware,
  appointmentController.getAppointmentsByPatient
);

// Get appointments for a doctor
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  appointmentController.getAppointmentsByDoctor
);

// General update (admin maybe?) — keep it last
router.put(
  "/appointments/:id/status",
  authMiddleware,
  appointmentController.updateAppointmentStatus
);

// ✅ CORRECTED DELETE route
router.delete(
  "/appointments/:doctorId/:appointmentId",
  authMiddleware,
  appointmentController.deleteAppointmentByDoctor
);

router.put('/status/patient/:patientId/:appointmentId', authMiddleware, appointmentController.updateAppointmentStatusByPatient);

module.exports = router;
