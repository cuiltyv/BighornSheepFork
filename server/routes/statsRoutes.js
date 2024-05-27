// routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/", statsController.getAdminStats);

module.exports = router;
