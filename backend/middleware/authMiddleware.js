// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const HealthcareProvider = require("../models/HealthcareProvider");

const protect = (allowedRoles = []) => {
  return async (req, res, next) => {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "patient") {
        req.user = await Patient.findById(decoded.id).select("-password");
      } else if (decoded.role === "provider") {
        req.user = await HealthcareProvider.findById(decoded.id).select(
          "-password"
        );
      }

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden for this role" });
      }

      req.role = decoded.role;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Token failed" });
    }
  };
};

module.exports = { protect };
