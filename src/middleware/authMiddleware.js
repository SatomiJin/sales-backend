const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "Xác thực thất bại",
        status: "ERR",
      });
    }

    if (user.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Xác thực thất bại",
        status: "ERR",
      });
    }
  });
};

//xác thực người dùng
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: err,
        status: "ERR",
      });
    }

    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "Xác thực thất bạiaaa",
        status: "ERR",
      });
    }
  });
};
module.exports = {
  authMiddleware,
  authUserMiddleware,
};
