const express = require("express");
const router = express.Router();
const {
  getSlotsByDoctor,
  createSlot,
} = require("../controllers/availibilityController");

// Get slots by doctor ID
router.get("/:doctorId", getSlotsByDoctor);

// Create a new slot
router.post("/", createSlot);

module.exports = router;
