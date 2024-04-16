const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

/* /usuarios ES EL URL BASE

    /usuarios/ : GET -> devuelve todos los usuarios
    /usuarios/:matricula : GET -> devuelve el usuario con matricula especifica
    /usuarios/ : POST -> crea un nuevo usuario
    /usuarios/registro : POST -> registra un nuevo usuario


*/

// server/routes/usersRoutes.js
router.get('/perfil/:matricula', usersController.getUserProfile);
router.get('/', usersController.getAllUsers);
router.get('/:matricula', usersController.getUserByMatricula);
router.post('/', usersController.createUser);
router.post('/registro', usersController.registerUser);


module.exports = router;
