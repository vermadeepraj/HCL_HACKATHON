// backend/routes/patientRoutes.js
const express = require("express");
const {
  getMyDashboard,
  upsertGoals,
  upsertReminders,
} = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes here require patient role
router.get("/me", protect(["patient"]), getMyDashboard);
router.put("/me/goals", protect(["patient"]), upsertGoals);
router.put("/me/reminders", protect(["patient"]), upsertReminders);

module.exports = router;
