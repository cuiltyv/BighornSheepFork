const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const mongoose = require("mongoose");
const config = require("./configs/config");
const usersRoutes = require("./routes/usersRoutes");
const reservationsRoutes = require("./routes/reservationsRoutes");
const roomsRoutes = require("./routes/salasRoutes");
const miscRoutes = require("./routes/miscRoutes");
const setupSwagger = require("./configs/swagger");
const hardwareRoutes = require("./routes/hardwareRoutes");
const videoRouter = require('./controllers/videosController');
const cookieParser = require("cookie-parser");

const { setup } = require("swagger-ui-express");
const { scheduleTask } = require("./controllers/schedulerController");

const app = express();

// Conexión a MongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
console.log("connecting to", mongoUrl);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cookieParser());

// Logger de solicitudes
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// Manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

// Configurar Swagger
setupSwagger(app);

// Rutas
app.use("/usuarios", usersRoutes);
app.use("/reservaciones", reservationsRoutes);
app.use("/salas", roomsRoutes);
app.use("/", miscRoutes);
app.use("/hardware", hardwareRoutes);
app.use("/refresh", require("./routes/refreshRoutes"));
app.use("/logout", require("./routes/logoutRoutes"));
app.use("/api/videos", videoRouter);

// Conexión a la base de datos SQL Server
sql
  .connect(config)
  .then((pool) => {
    if (pool.connecting) {
      console.log("Conecting to database");
    } else if (pool.connected) {
      console.log("Connected to database.");
    }


    //Comenzar con las tareas que se ejecutan cada 24 horas
    scheduleTask();

    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
