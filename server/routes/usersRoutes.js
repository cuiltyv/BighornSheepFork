const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
//const verifyJWT = require("../middleware/verifyJWT");

/* /usuarios ES EL URL BASE

    /usuarios/ : GET -> devuelve todos los usuarios
    /usuarios/:matricula : GET -> devuelve el usuario con matricula especifica
    /usuarios/ : POST -> crea un nuevo usuario
    /usuarios/registro : POST -> registra un nuevo usuario


*/
//router.get("/", verifyJWT, usersController.getAllUsers); Para que se necesite token para acceder

router.get("/", usersController.getAllUsers);
router.get("/:matricula", usersController.getUserByMatricula);
router.post("/", usersController.createUser);
router.post("/registro", usersController.registerUser);
router.post("/auth", usersController.loginUser);

module.exports = router;
