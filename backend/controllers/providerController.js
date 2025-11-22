// backend/controllers/providerController.js
const HealthcareProvider = require("../models/HealthcareProvider");
const Patient = require("../models/Patient");

// Provider dashboard: list own patients
const getMyPatients = async (req, res) => {
  try {
    const providerId = req.user._id;

    const provider = await HealthcareProvider.findById(providerId).populate({
      path: "patients",
      select: "name email age blood_group diseases symptoms bmi",
    });

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({
      provider: {
        name: provider.name,
        specialization: provider.specialization,
      },
      patients: provider.patients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Provider view of single patient detail
const getPatientDetail = async (req, res) => {
  try {
    const providerId = req.user._id;
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId)
      .populate("goal")
      .populate("reminder");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Make sure this provider is assigned to the patient
    if (
      !patient.assigned_provider ||
      patient.assigned_provider.toString() !== providerId.toString()
    ) {
      return res.status(403).json({ message: "Not authorized for this patient" });
    }

    res.json({
      profile: {
        name: patient.name,
        email: patient.email,
        age: patient.age,
        address: patient.address,
        blood_group: patient.blood_group,
        diseases: patient.diseases,
        symptoms: patient.symptoms,
        sleep_cycle: patient.sleep_cycle,
        weight: patient.weight,
        height: patient.height,
        bmi: patient.bmi,
      },
      goals: patient.goal || null,
      reminders: patient.reminder || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyPatients, getPatientDetail };
