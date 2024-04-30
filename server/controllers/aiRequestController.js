const sql = require("mssql");
const config = require("../configs/config");

module.exports = {
    createReservation: async (req, res) => {

        const {
            Matricula,
            ZonaID,
            HoraInicio,
            HoraFin,
            Proposito,
            Estado = "", // Optional
            Alumnos = [], // Obligatory, default to an empty array
            Hardware = [], // Optional, default to an empty array
        } = req.body;

        // Validate required fields
        if (!Matricula || !ZonaID || !HoraInicio || !HoraFin || !Proposito || !Alumnos.length) {
            return res.status(400).send({
                message: "Missing required fields",
                missingFields: [
                    !Matricula && "Matricula",
                    !ZonaID && "ZonaID",
                    !HoraInicio && "HoraInicio",
                    !HoraFin && "HoraFin",
                    !Proposito && "Proposito",
                    !Alumnos.length && "Alumnos",
                ].filter(Boolean),
            });
        }

        try {
            let pool = await sql.connect(config);
            const alumnoTable = new sql.Table("AlumnoType");
            alumnoTable.columns.add("Matricula", sql.VarChar(10));
            alumnoTable.columns.add("Rol", sql.NVarChar(50));
            Alumnos.forEach((alumno) => {
                alumnoTable.rows.add(alumno.Matricula, alumno.Rol || "Estudiante");
            });

            const hardwareTable = new sql.Table("HardwareType");
            hardwareTable.columns.add("HardwareID", sql.Int);
            hardwareTable.columns.add("Cantidad", sql.Int);
            Hardware.forEach((hardware) => {
                hardwareTable.rows.add(hardware.HardwareID, hardware.Cantidad);
            });

            await pool
                .request()
                .input("Matricula", sql.VarChar(10), Matricula)
                .input("ZonaID", sql.Int, ZonaID)
                .input("HoraInicio", sql.DateTime, HoraInicio)
                .input("HoraFin", sql.DateTime, HoraFin)
                .input("Proposito", sql.NVarChar(255), Proposito)
                .input("Estado", sql.NVarChar(50), Estado)
                .input("Alumnos", alumnoTable)
                .input("Hardware", hardwareTable)
                .execute("sp_InsertCompleteReservacion");

            res.status(201).send("Complete reservation added successfully");
        } catch (err) {
            console.error("the erorr is from here");
            console.error(err);
            res.status(500).send({ message: "Error with DB", error: err });
        }
    },
};