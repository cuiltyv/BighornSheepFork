const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const ROLES_LIST = require("../configs/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { verify } = require("jsonwebtoken");

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

//router.get("/", verifyJWT, usersController.getAllUsers); Para que se necesite token para acceder
/*
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
  usersController.getAllUsers
);
*/

router.post("/auth", usersController.loginUser);

module.exports = router;
