const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const EmailService = require("../services/EmailService");
//tạo hóa Đơn
// tạo sản phẩm
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              sold: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "OK",
            message: "Tạo hóa đơn thành công",
          };
        } else {
          resolve({
            status: "OK",
            message: "ERROR",
            id: order.product,
          });
        }
      });
      const result = await Promise.all(promises);
      const newData = result && result.filter((item) => item.id || null);
      if (newData.length) {
        const arrID = [];
        newData.forEach((item) => {
          arrID.push(item.id);
        });
        resolve({
          status: "ERROR",
          message: `Sản phẩm với id ${arrID.join(",")} đã hết hàng.`,
        });
      } else {
        const createOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName: fullName,
            address: address,
            city: city,
            phone: phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt,
        });
        if (createOrder) {
          await EmailService.sendEmailCreateOrder(email, totalPrice, address, shippingPrice, orderItems, paymentMethod);
          resolve({
            status: "OK",
            message: "Tạo hóa đơn thành công",
          });
        }
      }
      resolve({
        status: "OK",
        message: "Đặt hàng thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//lấy thông tin hóa Đơn
const getOrderByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      });
      if (order === null) {
        resolve({
          status: "OK",
          message: "Không tìm thấy hóa đơn",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin thành công",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//hủy hóa Đơn

const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            sold: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: +order.amount,
              sold: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);
          if (order === null) {
            resolve({
              status: "ERR",
              message: "Không tìm thấy hóa đơn",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `Sản phẩm với id: ${newData} không tồn tại`,
        });
      }
      resolve({
        status: "OK",
        message: "Xóa thành công",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//lấy thông tin hóa đơn theo id
const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "Hóa đơn không tồn tại",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//lấy tất cả hóa Đơn

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getOrderByID,
  cancelOrderDetails,
  getDetailsOrder,
  getAllOrder,
};
