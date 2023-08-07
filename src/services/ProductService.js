const Product = require("../models/ProductModel");

// tạo sản phẩm
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "Product đã tồn tại",
        });
      }
      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (createProduct) {
        resolve({
          status: "OK",
          message: "Tạo sản phẩm mới thành công",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//cập nhật sản phẩm
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkerProduct = await Product.findOne({
        _id: id,
      });
      if (checkerProduct === null) {
        resolve({
          status: "OK",
          message: "Sản phẩm không tồn tại",
        });
      }
      const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Cập nhật thông tin thành công",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy thông tin sản phẩm
const getDetailProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkerProduct = await Product.findOne({
        _id: id,
      });
      if (checkerProduct === null) {
        resolve({
          status: "OK",
          message: "Sản phẩm không tồn tại",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công",
        data: checkerProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//xóa sản phẩm
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkerProduct = await Product.findOne({
        _id: id,
      });

      if (checkerProduct === null) {
        resolve({
          status: "OK",
          message: "Sản phẩm không tồn tại",
        });
      }

      await Product.findByIdAndDelete(id, { new: true });

      resolve({
        status: "OK",
        messsage: "Xóa sản phẩm thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};
//xóa nhiều sản phầm
const deleteMultipleProducts = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        messsage: "Xóa sản phẩm thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};
//lấy thông tin tất cả sản phẩm
const getAllProducts = (limit = 20, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      let allProducts = [];
      if (filter) {
        const objectFilte = {};
        const labelFilter = filter[0];
        objectFilte[filter[0]] = filter[1];
        const allProductFilter = await Product.find({
          [labelFilter]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          messsage: "Lấy danh sách thành công",
          data: allProductFilter,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          messsage: "Lấy danh sách thành công",
          data: allProductSort,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (!limit) {
        const allProduct = await Product.find();
      } else {
        const allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
      }
      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        messsage: "Lấy danh sách thành công",
        data: allProduct,
        totalProduct: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
//lấy ra các loại của sản phẩm
const getAllTypeProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allTypeProduct = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công",
        data: allTypeProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//lấy thông tin dựa vào tên sản phẩm
const getDetailWithName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkerProduct = await Product.findOne({
        name: name,
      });
      if (checkerProduct === null) {
        resolve({
          status: "ERROR",
          message: "Sản phẩm không tồn tại",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công",
        data: checkerProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProducts,
  deleteMultipleProducts,
  getAllTypeProduct,
  getDetailWithName,
};
