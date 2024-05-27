const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * /api/user/friends:
 *   post:
 *     summary: Add a new friend
 *     description: Add a new friend by their User ID and Friend ID.
 *     tags: [User]
 *     requestBody:
 *       description: JSON object containing userID and friendID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               friendID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *       500:
 *         description: Error adding friend
 */
router.post("/friends", userController.addFriend);

/**
 * @swagger
 * /api/user/friends/{userID}:
 *   get:
 *     summary: Get user's friends
 *     description: Retrieve a list of friends for the given user ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of friends
 *       500:
 *         description: Error getting friends
 */
router.get("/friends/:userID", userController.getFriends);

/**
 * @swagger
 * /api/user/activities:
 *   post:
 *     summary: Log user activity
 *     description: Log a new user activity.
 *     tags: [User]
 *     requestBody:
 *       description: JSON object containing userID, activityType, and details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               activityType:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: Activity added successfully
 *       500:
 *         description: Error adding activity
 */
router.post("/activities", userController.addUserActivity);

/**
 * @swagger
 * /api/user/activities/{userID}:
 *   get:
 *     summary: Get user activities
 *     description: Retrieve a list of activities for the given user ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of activities
 *       500:
 *         description: Error getting activities
 */
router.get("/activities/:userID", userController.getUserActivities);

router.get(
  "/favorite-hardware/:userID",
  userController.getFavoriteHardwareDetails
);
router.get(
  "/hardware-reservations/:userID",
  userController.getHardwareReservationDetails
);

router.put("/update-biography", userController.updateUserBiography);

module.exports = router;
