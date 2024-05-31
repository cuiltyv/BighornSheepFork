const sql = require("mssql");
const config = require("../configs/config");

const getTotalHoursReserved = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, req.params.userID)
      .execute("sp_GetTotalHoursReserved");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

const getFavoriteHardware = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, req.params.userID)
      .execute("sp_GetFavoriteHardware");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

const getAchievements = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, req.params.userID)
      .execute("sp_GetAchievements");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

const getPersonalPointsDistribution = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .execute("sp_GetPersonalPointsDistribution");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Database error", error: err });
  }
};

module.exports = {
  getTotalHoursReserved,
  getFavoriteHardware,
  getAchievements,
  getPersonalPointsDistribution,
};
