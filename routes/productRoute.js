const express = require("express");
const { getAllProductsController,
    getProductByIdController,
    addProductController,
    updateProductByIdController,
    deleteProductByIdController } = require("../controllers/productController");
const { verifyToken, verifyAccess } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createProductSchema, updateProductSchema } = require("../validators/productValidator");

const router = express.Router();

router.get('/products', verifyToken, getAllProductsController);
router.get('/products/:id', verifyToken, getProductByIdController);
router.post('/products', verifyToken, verifyAccess, validate(createProductSchema), addProductController);
router.patch('/products/:id', verifyToken, verifyAccess, validate(updateProductSchema), updateProductByIdController); //?
router.delete('/products/:id', verifyToken, verifyAccess, deleteProductByIdController);

module.exports = router;