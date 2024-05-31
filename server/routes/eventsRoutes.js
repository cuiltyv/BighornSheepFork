const express = require("express");
const eventsController = require("../controllers/eventsController");
const router = express.Router();

/*  /api/events es el URL base
    
    /api/events/ : GET -> Sacar todos los eventos
    /api/events/ : POST -> Crear un nuevo evento
    /api/events/:id : DELETE -> Borrar un evento por ID
    /api/events/:id : PUT -> Actualizar un evento por ID
    /api/events/order : PUT -> Actualizar el orden de los eventos
    /api/events/visibility : PUT -> Actualizar la visibilidad de los eventos
    /api/events/most-recent : GET -> Obtener los eventos más recientes para la videowall
*/

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtener todos los eventos
 *     description: Retorna una lista de todos los eventos
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get("/", eventsController.getAllEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Crear un nuevo evento
 *     description: Agrega un nuevo evento a la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento creado exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.post("/", eventsController.addEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     description: Elimina un evento por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento eliminado exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.delete("/:id", eventsController.deleteEvent);

/**
 * @swagger
 * /api/events/order:
 *   put:
 *     summary: Actualizar el orden de los eventos
 *     description: Actualiza el orden de los eventos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reorderedEvents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     EventoID:
 *                       type: integer
 *                     Order:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Orden de eventos actualizado exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.put("/order", eventsController.updateEventOrder);

/**
 * @swagger
 * /api/events/visibility:
 *   put:
 *     summary: Actualizar la visibilidad de los eventos
 *     description: Actualiza la visibilidad de un evento en la videowall
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EventoID:
 *                 type: integer
 *               IsOnVW:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Visibilidad de evento actualizada exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.put("/visibility", eventsController.updateEventVisibility);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Actualiza los detalles de un evento por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EventoID:
 *                 type: integer
 *               Nombre:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               FechaInicio:
 *                 type: string
 *                 format: date-time
 *               FechaFin:
 *                 type: string
 *                 format: date-time
 *               ImageURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.put("/:id", eventsController.updateEvent);

/**
 * @swagger
 * /api/events/most-recent:
 *   get:
 *     summary: Obtener los eventos más recientes para la videowall
 *     description: Retorna una lista de los eventos más recientes para la videowall
 *     responses:
 *       200:
 *         description: Lista de eventos recientes obtenida exitosamente
 *       500:
 *         description: Error en la base de datos
 */
router.get("/most-recent", eventsController.getMostRecentEvents);

module.exports = router;
