const Patient = require("../models/Patient");
const PatientGoal = require("../models/PatientGoal");

const updatePatientGoals = async (req, res) => {
  try {
    const patientId = req.user._id;
    const { sleep_cycle, number_of_steps, hydration } = req.body;

    let goal = await PatientGoal.findOne({ patient: patientId });

    if (!goal) {
      goal = await PatientGoal.create({
        patient: patientId,
        sleep_cycle,
        number_of_steps,
        hydration,
      });

      await Patient.findByIdAndUpdate(patientId, { goal: goal._id });

    } else {
      if (sleep_cycle !== undefined) goal.sleep_cycle = sleep_cycle;
      if (number_of_steps !== undefined) goal.number_of_steps = number_of_steps;
      if (hydration !== undefined) goal.hydration = hydration;
      await goal.save();
    }

    res.json({ message: "Goals updated successfully", goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updatePatientGoals };
