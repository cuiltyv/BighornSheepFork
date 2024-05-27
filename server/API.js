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
const eventsRoutes = require("./routes/eventsRoutes");
const videoRouter = require("./controllers/videosController");
const statsRoutes = require("./routes/statsRoutes");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const achievementsRoutes = require("./routes/achievementsRoutes");
const { setup } = require("swagger-ui-express");
const { scheduleTask } = require("./controllers/schedulerController");

const app = express();
//
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

// !Comentar antes de subir a GitHub
// ?Descomentar para poder probar con localhost en react
/*
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
*/
//middleware for cookies
app.use(cookieParser());
/*
app.use((req, res, next) => {
  // Set the 'Access-Control-Allow-Origin' header to the value of the 'Origin' header in the incoming request
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  // Allow other required headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Allow the necessary HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Indicate that credentials (e.g., cookies) should be included in the request
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Proceed to the next middleware
  next();
});
*/
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
app.use("/api/events", eventsRoutes);
app.use("/api/statistics", statsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/achievements", achievementsRoutes);

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
