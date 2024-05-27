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

router.get("/", eventsController.getAllEvents);
router.post("/", eventsController.addEvent);
router.delete("/:id", eventsController.deleteEvent);
router.put("/order", eventsController.updateEventOrder);
router.put("/visibility", eventsController.updateEventVisibility);
router.put("/:id", eventsController.updateEvent);
router.get("/most-recent", eventsController.getMostRecentEvents);

module.exports = router;
