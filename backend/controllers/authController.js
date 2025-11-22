// backend/controllers/authController.js
const Patient = require("../models/Patient");
const HealthcareProvider = require("../models/HealthcareProvider");
const generateToken = require("../utils/generateToken");

// Patient signup
const registerPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      phone,
      address,
      blood_group,
      habits,
      diseases,
      symptoms,
      sleep_cycle,
      weight,
      height,
      bmi,
    } = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const patient = await Patient.create({
      name,
      email,
      password,
      age,
      phone,
      address,
      blood_group,
      habits,
      diseases,
      symptoms,
      sleep_cycle,
      weight,
      height,
      bmi,
    });

    const token = generateToken(patient._id, "patient");

    res.status(201).json({
      token,
      user: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: "patient",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Patient login
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient || !(await patient.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(patient._id, "patient");
    res.json({
      token,
      user: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: "patient",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Provider signup
const registerProvider = async (req, res) => {
  try {
    const {
      name,
      provider_type,
      registration_number,
      specialization,
      email,
      phone,
      address,
      password,
      consent_public_profile,
    } = req.body;

    const existing = await HealthcareProvider.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Provider already exists" });
    }

    const provider = await HealthcareProvider.create({
      name,
      provider_type,
      registration_number,
      specialization,
      email,
      phone,
      address,
      password,
      consent_public_profile,
    });

    const token = generateToken(provider._id, "provider");

    res.status(201).json({
      token,
      user: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        role: "provider",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Provider login
const loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await HealthcareProvider.findOne({ email });
    if (!provider || !(await provider.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(provider._id, "provider");
    res.json({
      token,
      user: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        role: "provider",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
  registerProvider,
  loginProvider,
};
