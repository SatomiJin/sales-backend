const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//general Access Token
const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "365d" }
  );
  return access_token;
};
//general Refresh Token
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};

//refresh Token
const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            messsage: err.toString(),
          });
        }

        const refresh_token = await generalRefreshToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        resolve({
          status: "OK",
          messsage: "Làm mới token thành công",
          refresh_token: refresh_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
  //=============
};
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
