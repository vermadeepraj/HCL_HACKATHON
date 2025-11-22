// backend/routes/authRoutes.js
const express = require("express");
const {
  registerPatient,
  loginPatient,
  registerProvider,
  loginProvider,
} = require("../controllers/authController");

const router = express.Router();

// Patient auth
router.post("/patient/signup", registerPatient);
router.post("/patient/login", loginPatient);

// Provider auth
router.post("/provider/signup", registerProvider);
router.post("/provider/login", loginProvider);

module.exports = router;
