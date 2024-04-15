const sql = require("mssql");
const config = require("../configs/config");

const handleLogout = async (req, res) => {
  //En el cliente tmb borrar el accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //204: No Content

  const refreshToken = cookies.jwt;

  // Is refreshToken in DB?

  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("refreshToken", sql.VarChar(500), refreshToken)
      .output("userExists", sql.Bit)
      .execute("sp_GetUserByRefreshToken");

    const userExists = result.output.userExists;

    if (!userExists) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken from DB

    await pool
      .request()
      .input("refreshToken", sql.VarChar(500), refreshToken)
      .execute("sp_ClearRefreshToken");

    res.clearCookie("jwt", {
      httpOnly: true,

      maxAge: 24 * 60 * 60 * 1000,
    }); //secure: true - only serves on https
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error con DB", error: err });
  }
};

module.exports = { handleLogout };
