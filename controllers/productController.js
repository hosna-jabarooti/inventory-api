const mongoose = require("mongoose");
const { getAllProdutsService,
    getProductByIdService,
    addProductService,
    updateProductByIdService,
    deleteProductByIdService } = require("../services/productService");

async function getAllProductsController(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const filters = {};
        const sort = {};
        const range = {};
        const category = { "$options": 'i' };
        if (req.query.category) {
            category.$regex = `^${req.query.category}`;
            filters.category = category;
        }
        if (req.query.sort) {
            sort.price = req.query.sort[0] === '-' ? -1 : 1;
        }
        if (req.query.minPrice) {
            range.$gte = Number(req.query.minPrice);
            filters.price = range;
        }
        if (req.query.maxPrice) {
            range.$lte = Number(req.query.maxPrice);
            filters.price = { ...range };
        }
        if (req.query.isAvailable) {
            filters.isAvailable = req.query.isAvailable === 'true' ? true : false;
        }
        const result = await getAllProdutsService(page, limit, sort, filters);
        // console.log(result);
        res.json(result);
    } catch (err) {
        next(err);

    }
}

async function getProductByIdController(req, res, next) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const err = new Error("Invalid product id format");
            err.status = 400;
            throw err;
        }
        const result = await getProductByIdService(id);
        if (!result) throw { status: 404, message: "no such product exists!" };
        res.json(result);
    } catch (err) {
        next(err);
    }
}
async function addProductController(req, res, next) {
    try {
        const newProduct = req.body;
        // TODO : check for duplicate name ✅  کارنکرد unique 
        await addProductService(newProduct);
        res.json("new product created successfully!");
    } catch (err) {
        next(err);
    }
}

async function updateProductByIdController(req, res, next) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const err = new Error("Invalid product id format");
            err.status = 400;
            throw err;
        }
        const data = req.body;
        const result = await updateProductByIdService(id, data);
        if(!result) throw { status: 404, message: "no such product exists!" };
        res.json("the product updated successfuly!");
    } catch (err) {
        next(err);
    }
}

async function deleteProductByIdController(req, res, next) {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const err = new Error("Invalid product id format");
            err.status = 400;
            throw err;
        }
        const result = await deleteProductByIdService(id);
        if(!result) throw { status: 404, message: "no such product exists!" };
        res.json("the product deleted successfuly!")
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getAllProductsController
    , getProductByIdController
    , addProductController
    , updateProductByIdController
    , deleteProductByIdController
};