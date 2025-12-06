// models/cycle.js
const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // owner
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  flow: { type: String, enum: ["light", "medium", "heavy"], required: true },
  symptoms: {
    cramps: { type: Boolean, default: false },
    moodSwings: { type: Boolean, default: false },
    bloating: { type: Boolean, default: false },
    fatigue: { type: Boolean, default: false },
  },
  notes: String,
});

module.exports = mongoose.model("Cycle", cycleSchema);
