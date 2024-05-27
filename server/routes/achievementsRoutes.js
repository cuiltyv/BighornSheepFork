const express = require("express");
const achievementsController = require("../controllers/achievementsController");
const router = express.Router();

/*
    /api/achievements/total-hours/:userID : GET -> devuelve el total de horas reservadas por el usuario
    /api/achievements/favorite-hardware/:userID : GET -> devuelve el hardware más reservado por el usuario
    /api/achievements/achievements/:userID : GET -> devuelve los logros del usuario
    
*/

router.get(
  "/total-hours/:userID",
  achievementsController.getTotalHoursReserved
);
router.get(
  "/favorite-hardware/:userID",
  achievementsController.getFavoriteHardware
);
router.get("/achievements/:userID", achievementsController.getAchievements);

module.exports = router;
