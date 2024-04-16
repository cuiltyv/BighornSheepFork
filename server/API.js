const express = require("express");
<<<<<<< HEAD
=======
const cors = require("cors");
>>>>>>> main
const sql = require("mssql");
const config = require("./configs/config");
const usersRoutes = require("./routes/usersRoutes");
const reservationsRoutes = require("./routes/reservationsRoutes");
const roomsRoutes = require("./routes/salasRoutes"); // Make sure this matches the exported name from the file
const miscRoutes = require("./routes/miscRoutes");
<<<<<<< HEAD
const hardwareRoutes = require("./routes/hardwareRoutes");
const cors = require("cors");
=======

const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
>>>>>>> main

const app = express();

app.use(cors());

app.use(express.json());

<<<<<<< HEAD
=======
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

>>>>>>> main
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
<<<<<<< HEAD
app.use("/hardware", hardwareRoutes);
=======
app.use("/refresh", require("./routes/refreshRoutes"));
app.use("/logout", require("./routes/logoutRoutes"));
>>>>>>> main

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
