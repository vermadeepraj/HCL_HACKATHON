// backend/models/HealthcareProvider.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ProviderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    provider_type: { type: String, required: true }, // doctor, nurse, etc.
    registration_number: { type: String, required: true },
    specialization: { type: String },

    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    password: { type: String, required: true },

    consent_public_profile: { type: Boolean, default: false },

    role: { type: String, default: "provider" },

    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  { timestamps: true }
);

ProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ProviderSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("HealthcareProvider", ProviderSchema);
