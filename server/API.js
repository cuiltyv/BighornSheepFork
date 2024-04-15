<<<<<<< HEAD
const express = require("express");
const sql = require("mssql");
const config = require("./configs/config");
const usersRoutes = require("./routes/usersRoutes");
const reservationsRoutes = require("./routes/reservationsRoutes");
const roomsRoutes = require("./routes/salasRoutes"); // Make sure this matches the exported name from the file
const miscRoutes = require("./routes/miscRoutes");
const hardWareRoutes = require("./routes/hardwareRoutes");
=======

const express = require('express');
const sql = require('mssql');
const config = require('./configs/config');
const usersRoutes = require('./routes/usersRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const roomsRoutes = require('./routes/salasRoutes');  
const miscRoutes = require('./routes/miscRoutes');
>>>>>>> main


const app = express();

app.use(express.json());


const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.use("/usuarios", usersRoutes);
app.use("/reservaciones", reservationsRoutes);
app.use("/salas", roomsRoutes);
app.use("/", miscRoutes);
app.use("/hardware", hardwareRoutes);

sql
  .connect(config)
  .then((pool) => {
    if (pool.connecting) {
      console.log("Conecting to database");
    } else if (pool.connected) {
      console.log("Connected to database.");
      connected = true;
    }

    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    connected = false;
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
