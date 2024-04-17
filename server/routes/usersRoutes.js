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
//router.get("/", verifyJWT, usersController.getAllUsers); Para que se necesite token para acceder
/*
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
  usersController.getAllUsers
);
*/


/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: An array of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *      - Users
 */
router.get("/", usersController.getAllUsers);



/**
 * @swagger
 * /usuarios/{matricula}:
 *   get:
 *     summary: Get a user by matricula
 *     description: Retrieve a user object by its matricula.
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's matricula.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *    - Users
 */
router.get("/:matricula", usersController.getUserByMatricula);



/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details such as matricula, name, last name, password, career, and semester.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Matricula
 *               - Nombre
 *               - Apellidos
 *               - Contraseña
 *               - Carrera
 *               - Semestre
 *             properties:
 *               Matricula:
 *                 type: string
 *                 description: Unique registration number of the user.
 *               Nombre:
 *                 type: string
 *                 description: First name of the user.
 *               Apellidos:
 *                 type: string
 *                 description: Last name of the user.
 *               Contraseña:
 *                 type: string
 *                 description: Password for the user account.
 *               Carrera:
 *                 type: string
 *                 description: Career or major of the user.
 *               Semestre:
 *                 type: integer
 *                 description: Current semester of the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       500:
 *         description: Server error or database connectivity issue.
 */
router.post("/", usersController.createUser);



/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with just matricula and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, matricula or password not provided.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *     - Users
 */
router.post("/registro", usersController.registerUser);



/**
 * @swagger
 * /usuarios/auth:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user and provide access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successfully authenticated, tokens provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: string
 *                   description: Roles of the user.
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token.
 *       401:
 *         description: Unauthorized, user or password incorrect.
 *       500:
 *         description: Server error or database connectivity issue.
 *   tags:
 *    - Users
 */
router.post("/auth", usersController.loginUser);

module.exports = router;
