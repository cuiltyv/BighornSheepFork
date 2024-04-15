// routes/miscRoutes.js
const express = require('express');
const miscController = require('../controllers/miscController');
const router = express.Router();

// Ruta: /


router.get('/', miscController.getRoot);
router.get('/test', miscController.getTest);

module.exports = router;
