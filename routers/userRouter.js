const express = require("express");
const router = express.Router();

// Require all the controller functions from authController.js
const { getDashboard } = require("../controllers/userController");
const { getUsers } = require("../controllers/adminController");

// Attach controller functions to user routes.
router.get("/dashboard", getDashboard);
router.get('/users', getUsers);

module.exports = router;