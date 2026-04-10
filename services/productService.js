const product = require("../models/product");  //?
const Product = require("../models/product");

async function getAllProdutsService(page, limit, sort, filters) {
    const skip = (page - 1) * limit;
    const products = await Product.find(filters).sort(sort)
        .skip(skip).limit(limit).lean();
    // console.log(products); =>  []
    const total = await Product.countDocuments(filters)
    return {
        data: products,
        meta: {
            total,
            page,
            limit,
            totalpages: Math.ceil(total / limit)
        }
    };
}

async function getProductByIdService(id) {
    const found = await Product.findById(id).lean();
    return found;
}

async function addProductService(newProduct) {
    const existing = await product.findOne({ name: newProduct.name });
    if (existing) throw { status: 400, message: "Product name already exists!" };
    return await product.create(newProduct);
}

async function updateProductByIdService(id, data) {
    const updated = await Product.findByIdAndUpdate(id, data,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
    // if (!updated) throw { status: 404, message: "no such product exists!" };  : روش2
    return updated;
}

async function deleteProductByIdService(id) {
    return await Product.findByIdAndDelete(id);
}

module.exports = {
    getAllProdutsService,
    getProductByIdService,
    addProductService,
    updateProductByIdService,
    deleteProductByIdService
};