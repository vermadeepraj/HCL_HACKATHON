// backend/models/PatientReminder.js
const mongoose = require("mongoose");

const PatientReminderSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      unique: true,
    },

    annual_blood_test: { type: Date },
    dental_checkup: { type: Date },
    eye_examination: { type: Date },

    water_reminder_interval_minutes: { type: Number, default: 120 },
    upcoming_health_checkup: { type: Date },

    health_tip: { type: String }, // could be generated or static
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientReminder", PatientReminderSchema);
