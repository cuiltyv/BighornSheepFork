const sql = require("mssql");
const config = require("../configs/config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("refreshToken", sql.VarChar(500), refreshToken)
      .output("userExists", sql.Bit)
      .execute("sp_GetUserByRefreshToken");

    const userExists = result.output.userExists;

    if (!userExists) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { Matricula: decoded.Matricula },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" } //15min
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error con DB", error: err });
  }
};

module.exports = { handleRefreshToken };
