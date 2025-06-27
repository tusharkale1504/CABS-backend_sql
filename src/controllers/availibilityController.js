const AvailabilitySlot = require("../models/availabilitySlot");
const User = require("../models/user");

// Get all available slots for a doctor
exports.getSlotsByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const slots = await AvailabilitySlot.findAll({
      where: { doctor_id: doctorId },
      include: [{ model: User, as: "doctor", attributes: ["full_name", "role"] }],
    });
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch availability slots" });
  }
};

// Create a new slot (optional but already present)
exports.createSlot = async (req, res) => {
  const { doctor_id, available_date, start_time, end_time } = req.body;

  if (!doctor_id || !available_date || !start_time || !end_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const slot = await AvailabilitySlot.create({
      doctor_id,
      available_date,
      start_time,
      end_time,
    });
    res.status(201).json({ message: "Slot created", slot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create slot" });
  }
};
