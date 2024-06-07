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

const logicaDeNegocioAi = async () => {
  try {
    const pool = await sql.connect(config);
    await pool.request().execute("sp_ConfirmNextPendingReservation");
    console.log("Se ha ejecutado la lógica de negocio AI.");
  } catch (error) {
    console.error("Error ejecutando SP:", error.message);
  }
};

const cancelarPendientes = async () => {
  try {
    const pool = await sql.connect(config);
    await pool.request().execute("sp_CancelPendingReservations");
    console.log("Se han cancelado las reservaciones pendientes.");
  } catch (error) {
    console.error("Error ejecutando SP:", error.message);
  }
};

const scheduleTask = () => {
  // Se corre cada día a la medianoche (UTC)
  cron.schedule("0 6 * * *", () => {
    console.log("Corriendo tarea programada a las 12:00 AM CST.");
    updateFinishedReservations();
    logicaDeNegocioAi();
    cancelarPendientes();
  });
};

module.exports = { scheduleTask };
