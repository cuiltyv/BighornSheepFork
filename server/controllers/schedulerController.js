const cron = require("node-cron");
const sql = require("mssql");
const config = require("../configs/config");

const updateFinishedReservations = async () => {
  try {
    const pool = await sql.connect(config);
    await pool.request().execute("sp_UpdateReservacionStatus");
    console.log("Se han actualizado las reservaciones finalizadas.");
  } catch (error) {
    console.error("Error ejecutando SP:", error.message);
  }
};

const scheduleTask = () => {
  // Se corre cada día a la medianoche (UTC)
  cron.schedule("0 0 * * *", () => {
    console.log("Corriendo tarea programada a las 12:00 AM UTC.");
    updateFinishedReservations();
  });
};

module.exports = { scheduleTask };
