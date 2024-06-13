// controllers/statsController.js
const sql = require("mssql");
const config = require("../configs/config");

const getAdminStats = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("StartDate", sql.Date, startDate)
      .input("EndDate", sql.Date, endDate)
      .execute("sp_GetAdminStats");
    res.json({
      totalReservations: result.recordsets[0][0].totalReservations,
      statusBreakdown: result.recordsets[1],
      popularRooms: result.recordsets[2],
      reservationsByTime: result.recordsets[3],
      userTypeBreakdown: result.recordsets[4],
      monthlyTrend: result.recordsets[5],
      userEngagement: result.recordsets[6],
      activeUsers: result.recordsets[7][0].activeUsers,
      hardwareUsage: result.recordsets[8],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error with DB", error: err });
  }
};

module.exports = { getAdminStats };
