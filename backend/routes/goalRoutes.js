const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updatePatientGoals } = require("../controllers/goalController");

const router = express.Router();

router.put("/me", protect(["patient"]), updatePatientGoals);

module.exports = router;
