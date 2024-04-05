const express = require('express');
const sql = require('mssql');
const config = require('./config');

const app = express();
app.use(express.json()); 


// Establecer conexion
sql.connect(config).then(pool => {
    if(pool.connecting) {
        console.log('Conecting to database');
    } else if(pool.connected) {
        console.log('Connected to database.');
    }

    return pool;
}).catch(err => {
    console.error('Database connection failed:', err);
});

// Sacar todas las reservaciones

app.get('/reservaciones', (req, res) => {
    new sql.Request().query('SELECT * FROM dbo.Reservaciones')
        .then(result => {
            res.json(result.recordset);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error querying the database');
        });
});


// POST una reservacione

app.post('/reservaciones', (req, res) => {
    // Example of using destructuring to get fields from the request body
    const { Matricula, ZonaID, HoraInicio, HoraFin, Proposito, Estado } = req.body;

    const query = `
        INSERT INTO dbo.Reservaciones (Matricula, ZonaID, HoraInicio, HoraFin, Proposito, Estado)
        VALUES (@Matricula, @ZonaID, @HoraInicio, @HoraFin, @Proposito, @Estado);
    `;

    new sql.Request()
        .input('Matricula', sql.VarChar(10), Matricula)
        .input('ZonaID', sql.Int, ZonaID)
        .input('HoraInicio', sql.DateTime, HoraInicio)
        .input('HoraFin', sql.DateTime, HoraFin)
        .input('Proposito', sql.NVarChar(255), Proposito)
        .input('Estado', sql.NVarChar(50), Estado)
        .query(query)
        .then(() => {
            res.status(201).send('Reservation created successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating reservation');
        });
});

// Reservaciones prontas (Solo las del futuro)

app.get('/reservaciones/upcoming', (req, res) => {
    const query = `
        SELECT * FROM dbo.Reservaciones
        WHERE HoraInicio > GETDATE()
        ORDER BY HoraInicio ASC;
    `;

    new sql.Request().query(query)
        .then(result => {
            res.json(result.recordset);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error querying the database for upcoming reservations');
        });
});

// GET Reservacion por ID

app.get('/reservaciones/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT * FROM dbo.Reservaciones WHERE ReservacionID = @ReservacionID;
    `;

    new sql.Request()
        .input('ReservacionID', sql.Int, id)
        .query(query)
        .then(result => {
            if (result.recordset.length > 0) {
                res.json(result.recordset[0]);
            } else {
                res.status(404).send('Reservation not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error querying the database');
        });
});


//Modificar (PUT) una reservacion 

app.put('/reservaciones/:id', (req, res) => {
    const { id } = req.params;
    const { Matricula, ZonaID, HoraInicio, HoraFin, Proposito, Estado } = req.body;

    const query = `
        UPDATE dbo.Reservaciones
        SET Matricula = @Matricula, ZonaID = @ZonaID, HoraInicio = @HoraInicio, HoraFin = @HoraFin, Proposito = @Proposito, Estado = @Estado
        WHERE ReservacionID = @ReservacionID;
    `;

    new sql.Request()
        .input('ReservacionID', sql.Int, id)
        .input('Matricula', sql.VarChar(10), Matricula)
        .input('ZonaID', sql.Int, ZonaID)
        .input('HoraInicio', sql.DateTime, HoraInicio)
        .input('HoraFin', sql.DateTime, HoraFin)
        .input('Proposito', sql.NVarChar(255), Proposito)
        .input('Estado', sql.NVarChar(50), Estado)
        .query(query)
        .then(() => {
            res.status(200).send('Reservation updated successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating reservation');
        });
});


// DELETE reservacion por ID
app.delete('/reservaciones/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM dbo.Reservaciones WHERE ReservacionID = @ReservacionID;
    `;

    new sql.Request()
        .input('ReservacionID', sql.Int, id)
        .query(query)
        .then(() => {
            res.status(200).send('Reservation deleted successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting reservation');
        });
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
