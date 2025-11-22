// backend/controllers/reminderController.js
const Patient = require("../models/Patient");
const PatientReminder = require("../models/PatientReminder");

const updateReminders = async (req, res) => {
  try {
    const providerId = req.user._id;
    const { id: patientId } = req.params;

    const patient = await Patient.findById(patientId);

    // Security: only provider assigned to patient can update reminders
    if (!patient || !patient.healthcare) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (patient.healthcare.toString() !== providerId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { annual_blood_test, dental_checkup, eye_examination } = req.body;

    let reminder = await PatientReminder.findOne({ patient: patientId });

    if (!reminder) {
      reminder = await PatientReminder.create({
        patient: patientId,
        annual_blood_test,
        dental_checkup,
        eye_examination,
      });

      await Patient.findByIdAndUpdate(patientId, { reminder: reminder._id });
    } else {
      if (annual_blood_test !== undefined)
        reminder.annual_blood_test = annual_blood_test;
      if (dental_checkup !== undefined)
        reminder.dental_checkup = dental_checkup;
      if (eye_examination !== undefined)
        reminder.eye_examination = eye_examination;

      await reminder.save();
    }

    res.json({ message: "Reminders updated successfully", reminder });

  } catch (err) {
    console.error("Reminder Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateReminders };
