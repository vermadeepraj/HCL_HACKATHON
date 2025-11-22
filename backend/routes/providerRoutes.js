// backend/routes/providerRoutes.js
const express = require("express");
const {
  getMyPatients,
  getPatientDetail,
} = require("../controllers/providerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me/patients", protect(["provider"]), getMyPatients);
router.get("/patients/:patientId", protect(["provider"]), getPatientDetail);

module.exports = router;
