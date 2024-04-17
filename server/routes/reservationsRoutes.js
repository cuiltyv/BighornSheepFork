const express = require("express");
const reservationsController = require("../controllers/reservationsController");
const router = express.Router();

/*
    /reservaciones ES EL URL BASE
    ejemplo: https://dreamapi.azurewebsites.net/reservaciones/upcoming

    /reservaciones/ : GET -> devuelve todas las reservaciones
    /reservaciones/upcoming : GET -> devuelve todas las reservaciones futuras
    /reservaciones/1 : GET -> devuelve la reservacion con ID 1
    /reservaciones/ : POST -> crea una nueva reservacion
    /reservaciones/1 : PUT -> actualiza la reservacion con ID 1
    /reservaciones/stats : GET -> devuelve estadisticas de las reservaciones para el dashboard de administardor
*/





/**
 * @swagger
 * /reservaciones:
 *   get:
 *     summary: Get all reservations
 *     description: Retrieve a list of all reservations that are not marked as deleted.
 *     responses:
 *       200:
 *         description: An array of reservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *      - Reservations
 */
router.get('/', reservationsController.getAllReservations);

/**
 * @swagger
 * /reservaciones/upcoming:
 *   get:
 *     summary: Get upcoming reservations
 *     description: Retrieve a list of all future reservations.
 *     responses:
 *       200:
 *         description: An array of upcoming reservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *    - Reservations
 */
router.get('/upcoming', reservationsController.getUpcomingReservations);


/**
 * @swagger
 * /reservaciones/stats:
 *   get:
 *     summary: Get reservation statistics
 *     description: Retrieve statistics for the dashboard such as number of reservations, confirmed reservations, etc.
 *     responses:
 *       200:
 *         description: Statistics data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 iconStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       icon:
 *                         type: string
 *                         description: Emoji representing the statistic.
 *                       count:
 *                         type: integer
 *                         description: The count of the statistic.
 *                       label:
 *                         type: string
 *                         description: Label for the statistic.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *   - Reservations
 */
router.get('/stats', reservationsController.getReservationStats);


/**
 * @swagger
 * /reservaciones/{id}:
 *   get:
 *     summary: Get a specific reservation by ID
 *     description: Retrieve details of a specific reservation by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the reservation.
 *     responses:
 *       200:
 *         description: A reservation object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *   - Reservations
 */
router.get('/:id', reservationsController.getReservationById);

/**
 * @swagger
 * /reservaciones:
 *   post:
 *     summary: Create a new reservation
 *     description: Add a new reservation with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *     - Reservations
 * components:
 *   schemas:
 *     NewReservation:
 *       type: object
 *       required:
 *         - Matricula
 *         - ZonaID
 *         - HoraInicio
 *         - HoraFin
 *         - Proposito
 *         - Estado
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Student registration number.
 *         ZonaID:
 *           type: integer
 *           description: Identifier of the zone where the reservation is made.
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: Start time of the reservation.
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: End time of the reservation.
 *         Proposito:
 *           type: string
 *           description: Purpose of the reservation.
 *         Estado:
 *           type: string
 *           description: State of the reservation.
 */
router.post('/', reservationsController.createReservation);

/**
 * @swagger
 * /reservaciones/{id}:
 *   put:
 *     summary: Update an existing reservation
 *     description: Update an existing reservation with new details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the reservation to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *    - Reservations
 * components:
 *   schemas:
 *     UpdateReservation:
 *       type: object
 *       properties:
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: New start time of the reservation.
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: New end time of the reservation.
 *         Proposito:
 *           type: string
 *           description: New purpose of the reservation.
 *         Estado:
 *           type: string
 *           description: New state of the reservation.
 */
router.put('/:id', reservationsController.updateReservation);

/**
 * @swagger
 * /reservaciones/set-deleted/{id}:
 *   put:
 *     summary: Mark a reservation as deleted
 *     description: Mark the specified reservation as deleted without actually removing it from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the reservation to mark as deleted.
 *     responses:
 *       200:
 *         description: Reservation marked as deleted successfully.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *    - Reservations
 */
router.put('/set-deleted/:id', reservationsController.setReservacionDeleted);

/**
 * @swagger
 * /reservaciones/{id}:
 *   delete:
 *     summary: Delete a specific reservation
 *     description: Delete a reservation by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the reservation to delete.
 *     responses:
 *       200:
 *         description: Reservation deleted successfully.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *   - Reservations
 */
router.delete('/:id', reservationsController.deleteReservation);



module.exports = router;
