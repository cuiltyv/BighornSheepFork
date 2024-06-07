const sql = require("mssql");
const config = require("../configs/config");

const addFriend = async (req, res) => {
  const { UserID, FriendID } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("UserID", sql.VarChar, UserID)
      .input("FriendID", sql.VarChar, FriendID)
      .execute("sp_AddFriend");
    res.status(200).send({ message: "Friend added successfully" });
  } catch (err) {
    console.error(err);
    z;
    res.status(500).send({ message: "Error adding friend", error: err });
  }
};

const getFriends = async (req, res) => {
  const { userID } = req.params;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .execute("sp_GetFriends");
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting friends", error: err });
  }
};

const addUserActivity = async (req, res) => {
  const { userID, activityType, details } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .input("ActivityType", sql.NVarChar, activityType)
      .input("ActivityDate", sql.DateTime, new Date())
      .input("Details", sql.NVarChar, details)
      .execute("sp_AddUserActivity");
    res.status(200).send({ message: "Activity added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding activity", error: err });
  }
};

const getUserActivities = async (req, res) => {
  const { userID } = req.params;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .execute("sp_GetUserActivities");
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Error getting user activities", error: err });
  }
};

const getFavoriteHardwareDetails = async (req, res) => {
  const userID = req.params.userID;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .execute("sp_GetFavoriteHardwareDetails");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error with DB", error: err });
  }
};

const getHardwareReservationDetails = async (req, res) => {
  const userID = req.params.userID;
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .execute("sp_GetHardwareReservationDetails");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error with DB", error: err });
  }
};

const updateUserBiography = async (req, res) => {
  const { userID, biografia } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("UserID", sql.VarChar, userID)
      .input("biografia", sql.Text, biografia)
      .execute("sp_UpdateUserBiography");
    res.status(200).send({ message: "Biography updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating biography", error: err });
  }
};

module.exports = {
  addFriend,
  getFriends,
  addUserActivity,
  getUserActivities,
  getFavoriteHardwareDetails,
  getHardwareReservationDetails,
  updateUserBiography,
};
