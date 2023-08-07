const ProductService = require("../services/ProductService");

// tạo sản phẩm
const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description, sold, discount } = req.body;
    if (!name || !type || !price || !countInStock || !rating || !description) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng không để trống thông tin",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};

//cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Sản phẩm không tồn tại",
      });
    }

    const response = await ProductService.updateProduct(productId, data, { new: true });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};

//lấy thông tin sản phẩm
const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Lấy thông tin sản phẩm thất bại",
      });
    }

    const response = await ProductService.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};

//xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không thể xác định sản phẩm",
      });
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//xóa nhiều sản phẩm
const deleteMultiple = async (req, res) => {
  try {
    const ids = req.body.id;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "Không thể xác định các sản phẩm",
      });
    }

    const response = await ProductService.deleteMultipleProducts(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//lấy thông tin toàn bộ sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductService.getAllProducts(Number(limit) || 20, Number(page) || 0, sort, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.toString(),
    });
  }
};
//lấy ra tất cả loại sản phẩm
const getAllTypeProduct = async (req, res) => {
  try {
    const response = await ProductService.getAllTypeProduct();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};

//lấy thông tin sản phẩm dựa vào tên
const getDetailWithName = async (req, res) => {
  try {
    const productName = req.params.name;
    if (!productName) {
      return res.status(200).json({
        status: "ERROR",
        message: "Lấy thông tin sản phẩm thất bại",
      });
    }

    const response = await ProductService.getDetailWithName(productName);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: e.toString(),
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProducts,
  deleteMultiple,
  getAllTypeProduct,
  getDetailWithName,
};
