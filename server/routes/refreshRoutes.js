const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshtokenController");


/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh the access token
 *     description: Validate the refresh token from cookies and issue a new access token.
 *     responses:
 *       200:
 *         description: A new access token has been successfully created and returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: integer
 *                   description: The role ID of the user.
 *                 accessToken:
 *                   type: string
 *                   description: The newly generated access token.
 *       401:
 *         description: Unauthorized, no refresh token cookie provided.
 *       403:
 *         description: Forbidden, refresh token is not valid or has expired.
 *       500:
 *         description: Internal server error, issue with database connectivity or execution.
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Authentication
 */
router.get("/", refreshTokenController.handleRefreshToken);


module.exports = router;
