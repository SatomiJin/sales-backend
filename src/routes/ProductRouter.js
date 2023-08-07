const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/create-product", ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.get("/detail-product/:id", ProductController.getDetailProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.post("/delete-multiple-product", ProductController.deleteMultiple);
router.get("/detail-all-product", ProductController.getAllProducts);
router.get("/get-all-type", ProductController.getAllTypeProduct);
router.get("/get-details-with-name/:name", ProductController.getDetailWithName);

module.exports = router;
