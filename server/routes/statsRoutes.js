// routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Obtener estadísticas administrativas
 *     description: Devuelve diversas estadísticas para administradores incluyendo reservas totales, desglose de estado, salas populares, reservas por tiempo, desglose por tipo de usuario, tendencia mensual, participación de usuarios, usuarios activos y uso de hardware.
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get("/", statsController.getAdminStats);

module.exports = router;
