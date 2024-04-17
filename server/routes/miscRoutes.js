// routes/miscRoutes.js
const express = require('express');
const miscController = require('../controllers/miscController');
const router = express.Router();

// Ruta: /

/**
 * @swagger
 * /:
 *   get:
 *     summary: Test route
 *     description: Find out if the server is running.
 *     responses:
 *       200:
 *         description: Route functioning.
 *         
 *             
 *       500:
 *         description: Error.
 *   tags:
 *    - Misc
 */
router.get('/', miscController.getRoot);


/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     description: Attempt to connect to database
 *     responses:
 *       200:
 *         description: Connected to database.
 *         
 *             
 *       500:
 *         description: Error.
 *   tags:
 *   - Misc
 */
router.get('/test', miscController.getTest);

module.exports = router;
