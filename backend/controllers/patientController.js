// backend/controllers/patientController.js
const Patient = require("../models/Patient");
const PatientGoal = require("../models/PatientGoal");
const PatientReminder = require("../models/PatientReminder");

// Fetch logged-in patient's dashboard data
const getMyDashboard = async (req, res) => {
  try {
    const patientId = req.user._id;

    const patient = await Patient.findById(patientId)
      .populate("goal")
      .populate("reminder")
      .populate("healthcare", "name provider_type specialization");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({
      profile: {
        name: patient.name,
        email: patient.email,
        age: patient.age,
        address: patient.address,
        phone_number: patient.phone_number,
        weight: patient.weight,
        height: patient.height,
        bmi: patient.bmi,
      },
      healthcare_center: patient.healthcare || null,
      goals: patient.goal || null,
      reminders: patient.reminder || null,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upsert patient goals
const upsertGoals = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { sleep_cycle, steps_per_day, hydration_litres, custom_goals } =
      req.body;

    let goal = await PatientGoal.findOne({ patient: patientId });

    if (!goal) {
      goal = await PatientGoal.create({
        patient: patientId,
        sleep_cycle,
        steps_per_day,
        hydration_litres,
        custom_goals,
      });

      await Patient.findByIdAndUpdate(patientId, { goal: goal._id });
    } else {
      goal.sleep_cycle = sleep_cycle ?? goal.sleep_cycle;
      goal.steps_per_day = steps_per_day ?? goal.steps_per_day;
      goal.hydration_litres = hydration_litres ?? goal.hydration_litres;
      goal.custom_goals = custom_goals ?? goal.custom_goals;
      await goal.save();
    }

    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upsert reminders (preventive care + checkups)
const upsertReminders = async (req, res) => {
  try {
    const patientId = req.user._id;
    const {
      annual_blood_test,
      dental_checkup,
      eye_examination,
      water_reminder_interval_minutes,
      upcoming_health_checkup,
      health_tip,
    } = req.body;

    let reminder = await PatientReminder.findOne({ patient: patientId });

    if (!reminder) {
      reminder = await PatientReminder.create({
        patient: patientId,
        annual_blood_test,
        dental_checkup,
        eye_examination,
        water_reminder_interval_minutes,
        upcoming_health_checkup,
        health_tip,
      });

      await Patient.findByIdAndUpdate(patientId, { reminder: reminder._id });
    } else {
      if (annual_blood_test) reminder.annual_blood_test = annual_blood_test;
      if (dental_checkup) reminder.dental_checkup = dental_checkup;
      if (eye_examination) reminder.eye_examination = eye_examination;
      if (water_reminder_interval_minutes)
        reminder.water_reminder_interval_minutes =
          water_reminder_interval_minutes;
      if (upcoming_health_checkup)
        reminder.upcoming_health_checkup = upcoming_health_checkup;
      if (health_tip) reminder.health_tip = health_tip;
      await reminder.save();
    }

    res.json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getMyDashboard,
  upsertGoals,
  upsertReminders,
};
