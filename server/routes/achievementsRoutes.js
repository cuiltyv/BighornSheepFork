const express = require("express");
const achievementsController = require("../controllers/achievementsController");
const router = express.Router();

/*
    /api/achievements/total-hours/:userID : GET -> devuelve el total de horas reservadas por el usuario
    /api/achievements/favorite-hardware/:userID : GET -> devuelve el hardware más reservado por el usuario
    /api/achievements/achievements/:userID : GET -> devuelve los logros del usuario
    /api/achievements/personal-points-distribution : GET -> devuelve la distribución de puntos
*/

/**
 * @swagger
 * /achievements/total-hours/{userID}:
 *   get:
 *     summary: Obtener el total de horas reservadas por el usuario
 *     description: Devuelve el total de horas reservadas por un usuario específico
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Total de horas reservadas obtenido exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get(
  "/total-hours/:userID",
  achievementsController.getTotalHoursReserved
);

/**
 * @swagger
 * /achievements/favorite-hardware/{userID}:
 *   get:
 *     summary: Obtener el hardware más reservado por el usuario
 *     description: Devuelve el hardware más reservado por un usuario específico
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hardware favorito obtenido exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get(
  "/favorite-hardware/:userID",
  achievementsController.getFavoriteHardware
);

/**
 * @swagger
 * /achievements/achievements/{userID}:
 *   get:
 *     summary: Obtener los logros del usuario
 *     description: Devuelve los logros de un usuario específico
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logros obtenidos exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get("/achievements/:userID", achievementsController.getAchievements);

/**
 * @swagger
 * /achievements/personal-points-distribution:
 *   get:
 *     summary: Obtener la distribución de puntos personales
 *     description: Devuelve la distribución de puntos personales
 *     responses:
 *       200:
 *         description: Distribución de puntos obtenida exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get(
  "/personal-points-distribution",
  achievementsController.getPersonalPointsDistribution
);

module.exports = router;
