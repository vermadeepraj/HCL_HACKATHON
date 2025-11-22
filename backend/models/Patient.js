const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    age: { type: Number },
    phone: { type: String },
    address: { type: String },

    blood_group: { type: String },
    habits: { type: String },
    diseases: { type: String },
    symptoms: { type: String },

    weight: { type: Number },
    height: { type: Number },
    bmi: { type: Number },

    role: { type: String, default: "patient" },

    // relationship to one healthcare provider
    healthcare: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthcareProvider",
    },

    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientGoal",
    },

    reminder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientReminder",
    },
  },
  { timestamps: true }
);

// FIXED pre-save middleware
PatientSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

PatientSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("Patient", PatientSchema);
