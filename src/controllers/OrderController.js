const OrderService = require("../services/OrderService");

//tạo hóa Đơn
const createOrder = async (req, res) => {
  try {
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;
    if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};

//lấy thông tin hóa đơn
const getOrderByID = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Lấy thông thất bại",
      });
    }

    const response = await OrderService.getOrderByID(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};

//xóa hóa Đơn

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    const orderId = req.body.orderId;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "Truy cập thất bại",
      });
    }
    const response = await OrderService.cancelOrderDetails(orderId, data);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//lấy thông tin đơn hàng theo id
const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "Truy cập không thành công",
      });
    }
    const response = await OrderService.getDetailsOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//lấy tất cả order
const getAllOrder = async (req, res) => {
  try {
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  getOrderByID,
  cancelOrderDetails,
  getDetailsOrder,
  getAllOrder,
};
