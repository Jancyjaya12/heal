const express = require("express");
const router = express.Router();

// Require all the controller functions from authController.js
const { getDashboard } = require("../controllers/userController");

// Attach controller functions to user routes.
router.get("/dashboard", getDashboard);

module.exports = router;