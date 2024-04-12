const express = require('express');
const reservationsController = require('../controllers/reservationsController');
const router = express.Router();

/*
    /reservaciones ES EL URL BASE
    ejemplo:
    /reservaciones/ : GET -> devuelve todas las reservaciones
    /reservaciones/upcoming : GET -> devuelve todas las reservaciones futuras
    /reservaciones/1 : GET -> devuelve la reservacion con ID 1
    /reservaciones/ : POST -> crea una nueva reservacion
    /reservaciones/1 : PUT -> actualiza la reservacion con ID 1
*/

router.get('/', reservationsController.getAllReservations);
router.get('/upcoming', reservationsController.getUpcomingReservations);
router.get('/:id', reservationsController.getReservationById);
router.post('/', reservationsController.createReservation);
router.put('/:id', reservationsController.updateReservation);
router.delete('/:id', reservationsController.deleteReservation);


module.exports = router;
