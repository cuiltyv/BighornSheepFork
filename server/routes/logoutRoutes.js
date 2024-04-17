const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out a user
 *     description: Clears the refresh token cookie to log out the user.
 *     responses:
 *       204:
 *         description: No content, successful logout and cookie cleared.
 *       400:
 *         description: Bad request, no JWT cookie to clear.
 *       500:
 *         description: Internal server error, error with database connection or execution.
 *     security:
 *       - cookieAuth: []
 *   tags: 
 *      - Authentication
 */
router.get("/", logoutController.handleLogout);


module.exports = router;
