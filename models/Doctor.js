const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String },
  availability: [
    {
      date: { type: String, required: true }, // e.g., "2025-08-10"
      time: { type: String, required: true }, // e.g., "10:00 AM"
      isBooked: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);