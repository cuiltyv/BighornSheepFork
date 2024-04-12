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

router.get('/', roomsController.getAllRooms);


module.exports = router;
