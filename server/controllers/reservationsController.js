// controllers/reservationsController.js
const sql = require('mssql');
const config = require('../configs/config');

// Ruta: /reservations
// Todas las reservaciones
const getAllReservations = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().execute('sp_GetAllReservaciones');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Ruta: /reservations/upcoming
// Reservaciones del futuro
const getUpcomingReservations = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().execute('sp_GetUpcomingReservaciones');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Ruta: /reservations/:id
// Reservacion por ID
const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("ReservacionID", sql.Int, id)
            .execute("sp_GetReservacionByID");
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).send("Reservation not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Crear una reservacion
// Ruta: /reservations (POST)
const createReservation = async (req, res) => {
    const { Matricula, ZonaID, HoraInicio, HoraFin, Proposito, Estado } = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("Matricula", sql.VarChar(10), Matricula)
            .input("ZonaID", sql.Int, ZonaID)
            .input("HoraInicio", sql.DateTime, HoraInicio)
            .input("HoraFin", sql.DateTime, HoraFin)
            .input("Proposito", sql.NVarChar(255), Proposito)
            .input("Estado", sql.NVarChar(50), Estado)
            .execute("sp_InsertReservacion");
        res.status(201).send("Reservation created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Actualizar una reservacion
// Ruta: /reservations/:id (PUT)
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { HoraInicio, HoraFin, Proposito, Estado } = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("ReservacionID", sql.Int, id)
            .input("HoraInicio", sql.DateTime, HoraInicio)
            .input("HoraFin", sql.DateTime, HoraFin)
            .input("Proposito", sql.NVarChar(255), Proposito)
            .input("Estado", sql.NVarChar(50), Estado)
            .execute("sp_UpdateReservacion");
        res.status(200).send("Reservation updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

// Borrar una reservacion
// Ruta: /reservations/:id (DELETE)
const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("ReservacionID", sql.Int, id)
            .execute("sp_DeleteReservacion");
        res.status(200).send("Reservation deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};

const getReservationStats = async (req, res) => {
    try {
        let result = await pool.request().execute('sp_GetStats');
        
        const stats = {
            iconStats: [
                { icon: '🏠', count: result.recordset[0].TiposDeCuartos, label: 'Tipos de cuartos' },
                { icon: '📘', count: result.recordset[0].Reservaciones, label: 'Reservaciones' },
                { icon: '👍', count: result.recordset[0].Confirmadas, label: 'Confirmadas' },
                { icon: '👥', count: result.recordset[0].Eventos, label: 'Eventos' }
            ]
        };

        res.status(200).json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error con DB", error: err });
    }
};




module.exports = {
    getAllReservations,
    getUpcomingReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationStats
};
