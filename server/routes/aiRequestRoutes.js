const express = require("express");
const aiRequestController = require("../controllers/aiRequestController");
const router = express.Router();


/**
 * @swagger
 * /ai/reservation:
 *   post:
 *     summary: Crear una nueva reservación por medio de LLM
 *     description: Agrega una nueva reservación a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReservation'
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *       400:
 *         description: Faltan campos requeridos.
 *     tags:
 *       - Reservaciones
 * components:
 *   schemas:
 *     NewReservation:
 *       type: object
 *       required:
 *         - Matricula
 *         - SalaID
 *         - HoraInicio
 *         - HoraFin
 *         - Proposito
 *         - Estado
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Matricula del Alumno creando la reservación.
 *         SalaID:
 *           type: integer
 *           description: Identificador de la sala reservada.
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: Tiempo de inicio de la reservación.
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: Tiempo de finalización de la reservación.
 *         Proposito:
 *           type: string
 *           description: Propósito de la reservación.
 *         Estado:
 *           type: string
 *           description: Estado actual de la reservación.
 *         Alumnos:
 *           type: array
 *           description: Lista de alumnos que participan en la reservación.
 *           items:
 *             type: object
 *             required:
 *               - Matricula
 *             properties:
 *               Matricula:
 *                 type: integer
 *                 description: Matrícula del alumno.
 *               Rol:
 *                 type: string
 *                 description: Rol del alumno en la reservación.
 *                 default: 'Estudiante'
 *                 enum:
 *                   - 'Leader'
 *                   - 'Estudiante'
 *         Hardware:
 *           type: array
 *           description: Lista de hardware solicitado para la reservación.
 *           items:
 *             type: object
 *             required:
 *               - HardwareID
 *               - Cantidad
 *             properties:
 *               HardwareID:
 *                 type: integer
 *                 description: Identificador del tipo de hardware.
 *               Cantidad:
 *                 type: integer
 *                 description: Cantidad de hardware solicitado.
 */
router.post("/reservation", aiRequestController.createReservation);

/**
 * @swagger
 * /ai/reservations/{Matricula}:
 *   get:
 *     summary: Obtener próximas reservaciones por matrícula
 *     description: Recupera todas las reservaciones futuras para un alumno específico usando su matrícula.
 *     parameters:
 *       - in: path
 *         name: Matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: Matricula del Alumno.
 *     responses:
 *       200:
 *         description: Lista de reservaciones futuras.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Matricula:
 *                     type: string
 *                     description: Matricula del Alumno.
 *                   HoraInicio:
 *                     type: string
 *                     format: date-time
 *                     description: Tiempo de inicio de la reservación.
 *                   HoraFin:
 *                     type: string
 *                     format: date-time
 *                     description: Tiempo de finalización de la reservación.
 *                   NombreZona:
 *                     type: string
 *                     description: Nombre de la zona de instalación.
 *                   NombreUsuario:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   LinkSala:
 *                     type: string
 *                     description: Enlace a la sala.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *       400:
 *         description: Faltan campos requeridos.
 *     tags:
 *       - Reservaciones
 */
router.get("/reservations/:Matricula", aiRequestController.getUpcomingReservations);


module.exports = router;