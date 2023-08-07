const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generalAccessToken, generalRefreshToken } = require("./jwtService");

//create user
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "Emai đã tồn tại",
        });
      }
      const hashPass = bcrypt.hashSync(password, 10);

      const createUser = await User.create({
        name,
        email,
        password: hashPass,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          messsage: "Create success!!",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//login user
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Emai chưa được đăng ký",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "OK",
          messsage: "Tài khoản hoặc mật khẩu không chính xác",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        messsage: "Đăng nhập thành công",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//update user
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "User chưa được đăng ký",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        messsage: "Cập nhật thành công",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//delete user
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "User chưa được đăng ký",
        });
      }

      await User.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        messsage: "Xóa user thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};
//xóa nhiều người dùng
const deleteMultipleUsers = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });

      resolve({
        status: "OK",
        messsage: "Xóa Users thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get all users
const getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find();

      resolve({
        status: "OK",
        messsage: "Lấy danh sách thành công",
        data: allUsers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get details user
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "OK",
          message: "Lấy thông tin người dùng thất bại",
        });
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

//refresh token

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailsUser,
  deleteMultipleUsers,
};
