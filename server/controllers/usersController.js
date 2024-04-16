// controllers/usersController.js
const sql = require('mssql');
const config = require('../configs/config');

// Sacar todos los usuarios
// Ruta: /usuarios
const getAllUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().execute('sp_GetAllUsuarios');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// server/controllers/usersController.js
const getUserProfile = async (req, res) => {
    const { matricula } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("Matricula", sql.VarChar(10), matricula)
            .execute("sp_GetUsuarioPerfilByMatricula");
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).send("User profile not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Sacar un usuario por matricula
// Ruta: /usuarios/:matricula
const getUserByMatricula = async (req, res) => {
    const { matricula } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("Matricula", sql.VarChar(10), matricula)
            .execute("sp_GetUsuarioByMatricula");
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Crear un usuario con todos los datos
// Ruta: /usuarios (POST)
const createUser = async (req, res) => {
    const { Matricula, Nombre, Apellido, Contraseña, Carrera, Semestre } = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("Matricula", sql.VarChar(10), Matricula)
            .input("Nombre", sql.NVarChar(50), Nombre)
            .input("Apellidos", sql.NVarChar(50), Apellido)
            .input("Contraseña", sql.NVarChar(50), Contraseña)
            .input("Carrera", sql.NVarChar(50), Carrera)
            .input("Semestre", sql.Int, Semestre)
            .execute("sp_InsertUsuario");
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Registrar un usuario, solo con matricula y contraseña 
// Ruta: /registro (POST)
const registerUser = async (req, res) => {
    const { Matricula, Contrasena } = req.body;

    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("Matricula", sql.VarChar(10), Matricula)
            .input("Contrasena", sql.NVarChar(50), Contrasena)
            .execute("registroUsuario");
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

module.exports = {
    getAllUsers,
    getUserByMatricula,
    createUser,
    registerUser,
    getUserProfile,
};
