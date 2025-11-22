// backend/models/PatientGoal.js
const mongoose = require("mongoose");

const PatientGoalSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      unique: true, // one goal doc per patient
    },
    sleep_cycle: { type: String }, // e.g., "7-8 hours"
    steps_per_day: { type: Number },
    hydration_litres: { type: Number },
    custom_goals: { type: String }, // free text for other goals
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientGoal", PatientGoalSchema);
