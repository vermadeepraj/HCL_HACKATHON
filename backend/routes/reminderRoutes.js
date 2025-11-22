const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateReminders } = require("../controllers/reminderController");

const router = express.Router();

router.put("/:id", protect(["provider"]), updateReminders);

module.exports = router;
