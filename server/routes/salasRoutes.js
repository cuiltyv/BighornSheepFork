const express = require('express');
const roomsController = require('../controllers/salasController');
const router = express.Router();

/*  /salas ES EL URL BASE
    
        /salas/ : GET -> devuelve todas las salas


        Rutas que faltan por hacer:
        /salas/ : POST -> crea una nueva sala
        /salas/1 : PUT -> actualiza la sala con ID 1
        /salas/1 : DELETE -> borra la sala con ID 1
        /salas/1/reservaciones : GET -> devuelve todas las reservaciones de la sala con ID 1

*/

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve a list of all rooms.
 *     responses:
 *       200:
 *         description: An array of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the room.
 *                   name:
 *                     type: string
 *                     description: The name of the room.
 *                   capacity:
 *                     type: integer
 *                     description: The capacity of the room.
 *                   
 *       500:
 *         description: Internal server error, issue with database connectivity or execution.
 *     tags:
 *       - Rooms
 */
router.get('/', roomsController.getAllRooms);



module.exports = router;
