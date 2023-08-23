const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

//create user
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng điền đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    if (!req.body || !req.body.name) {
      return res.status(200).json({
        status: "ERR",
        message: e.toString(),
      });
    }
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng điền đầy đủ thông tin",
        data: req.body,
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const response = await UserService.loginUser(req.body);

    const { access_token, ...newResponse } = response;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false, // Sử dụng 'true' nếu bạn sử dụng HTTPS
      sameSite: "strict",
      path: "/",
      // Các tùy chọn khác của cookie (nếu cần)
    });

    return res.status(200).json({ response, access_token });
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is invalid",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is invalid",
      });
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    if (!req.body || !req.body.name) {
      return res.status(200).json({
        status: "ERR",
        message: e.toString(),
      });
    }
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//xóa nhiều user
const deleteMultiple = async (req, res) => {
  try {
    const userIds = req.body;

    if (!userIds) {
      return res.status(200).json({
        status: "ERR",
        message: "Không thể xác định các người dùng cần xóa",
      });
    }

    const response = await UserService.deleteMultipleUsers(userIds);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//get all users
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (e) {
    if (!req.body || !req.body.name) {
      return res.status(200).json({
        status: "ERR",
        message: e.toString(),
      });
    }
    return res.status(404).json({
      message: e.toString(),
    });
  }
};

//get details user
const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is invalid",
      });
    }

    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//refresh token
const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is invalid",
      });
    }
    const response = await jwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
      here: "here",
    });
  }
};
//log out user
const logOutUser = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({
      status: "OK",
      message: "logout",
    });
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
      here: "here",
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailsUser,
  refreshToken,
  logOutUser,
  deleteMultiple,
};
