const express = require("express");
const hardwareController = require("../controllers/hardwareController");
const router = express.Router();

/*  /hardware ES EL URL BASE

        /hardware/ : GET -> devuelve todas las salas


        Rutas que faltan por hacer:
        /hardware/ : POST -> crea una nueva sala
        /hardware/1 : PUT -> actualiza la sala con ID 1
        /hardware/1 : DELETE -> borra la sala con ID 1
        /hardware/1/reservaciones : GET -> devuelve todas las reservaciones de la sala con ID 1

*/

router.get("/", hardwareController.getAllHardware);

module.exports = router;
