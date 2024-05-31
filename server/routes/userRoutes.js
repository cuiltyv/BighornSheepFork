// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * /api/user/friends:
 *   post:
 *     summary: Agregar un nuevo amigo
 *     description: Agrega un nuevo amigo por su ID de usuario y ID de amigo.
 *     tags: [User]
 *     requestBody:
 *       description: Objeto JSON que contiene userID y friendID.
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
 *         description: Amigo agregado exitosamente
 *       500:
 *         description: Error al agregar amigo
 */
router.post("/friends", userController.addFriend);

/**
 * @swagger
 * /api/user/friends/{userID}:
 *   get:
 *     summary: Obtener amigos del usuario
 *     description: Recupera una lista de amigos para el ID de usuario dado.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de amigos
 *       500:
 *         description: Error al obtener amigos
 */
router.get("/friends/:userID", userController.getFriends);

/**
 * @swagger
 * /api/user/activities:
 *   post:
 *     summary: Registrar actividad del usuario
 *     description: Registra una nueva actividad del usuario.
 *     tags: [User]
 *     requestBody:
 *       description: Objeto JSON que contiene userID, activityType y details.
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
 *         description: Actividad agregada exitosamente
 *       500:
 *         description: Error al agregar actividad
 */
router.post("/activities", userController.addUserActivity);

/**
 * @swagger
 * /api/user/activities/{userID}:
 *   get:
 *     summary: Obtener actividades del usuario
 *     description: Recupera una lista de actividades para el ID de usuario dado.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de actividades
 *       500:
 *         description: Error al obtener actividades
 */
router.get("/activities/:userID", userController.getUserActivities);

/**
 * @swagger
 * /api/user/favorite-hardware/{userID}:
 *   get:
 *     summary: Obtener detalles del hardware favorito
 *     description: Recupera los detalles del hardware favorito para el ID de usuario dado.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del hardware favorito
 *       500:
 *         description: Error al obtener detalles del hardware favorito
 */
router.get(
  "/favorite-hardware/:userID",
  userController.getFavoriteHardwareDetails
);

/**
 * @swagger
 * /api/user/hardware-reservations/{userID}:
 *   get:
 *     summary: Obtener detalles de las reservas de hardware
 *     description: Recupera los detalles de las reservas de hardware para el ID de usuario dado.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de las reservas de hardware
 *       500:
 *         description: Error al obtener detalles de las reservas de hardware
 */
router.get(
  "/hardware-reservations/:userID",
  userController.getHardwareReservationDetails
);

/**
 * @swagger
 * /api/user/update-biography:
 *   put:
 *     summary: Actualizar biografía del usuario
 *     description: Actualiza la biografía del usuario.
 *     tags: [User]
 *     requestBody:
 *       description: Objeto JSON que contiene userID y biografía.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Biografía actualizada exitosamente
 *       500:
 *         description: Error al actualizar la biografía
 */
router.put("/update-biography", userController.updateUserBiography);

module.exports = router;
