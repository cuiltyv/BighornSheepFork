const sql = require("mssql");
const config = require("../configs/config");

//Ruta: /api/events

// Sacar todos los eventos
const getAllEvents = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute("sp_GetOrderedEvents");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Agregar un evento
const addEvent = async (req, res) => {
  const { name, description, startDate, endDate, imageUrl } = req.body;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Nombre", sql.NVarChar, name)
      .input("Descripcion", sql.NVarChar, description)
      .input("FechaInicio", sql.DateTime, new Date(startDate)) // Use DateTime
      .input("FechaFin", sql.DateTime, new Date(endDate)) // Use DateTime
      .input("ImageURL", sql.NVarChar, imageUrl)
      .execute("sp_AddEvent");

    res.json({
      EventoID: result.recordset[0].EventoID,
      name,
      description,
      startDate,
      endDate,
      imageUrl,
      order: result.recordset[0].Order,
      isOnVW: result.recordset[0].IsOnVW,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("EventoID", sql.Int, id)
      .execute("sp_DeleteEvent");

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Actualizar el orden de los eventos
const updateEventOrder = async (req, res) => {
  const { reorderedEvents } = req.body;

  try {
    let pool = await sql.connect(config);

    for (let i = 0; i < reorderedEvents.length; i++) {
      const event = reorderedEvents[i];
      await pool
        .request()
        .input("EventoID", sql.Int, event.EventoID)
        .input("Order", sql.Int, i)
        .execute("sp_UpdateEventOrder");
    }

    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Actualizar la visibilidad de los eventos
const updateEventVisibility = async (req, res) => {
  const { EventoID, IsOnVW } = req.body;

  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("EventoID", sql.Int, EventoID)
      .input("IsOnVW", sql.Bit, IsOnVW)
      .execute("sp_UpdateEventVisibility");

    res.status(200).json({ message: "Visibility updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
  const { EventoID, Nombre, Descripcion, FechaInicio, FechaFin, ImageURL } =
    req.body;

  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("EventoID", sql.Int, EventoID)
      .input("Nombre", sql.NVarChar, Nombre)
      .input("Descripcion", sql.NVarChar, Descripcion)
      .input("FechaInicio", sql.DateTime, new Date(FechaInicio))
      .input("FechaFin", sql.DateTime, new Date(FechaFin))
      .input("ImageURL", sql.NVarChar, ImageURL)
      .execute("sp_UpdateEvent");

    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

// Obtener los eventos más recientes para la videowall
const getMostRecentEvents = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute("sp_GetEventsForVideoWall");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEventOrder,
  updateEventVisibility,
  updateEvent,
  getMostRecentEvents,
};
