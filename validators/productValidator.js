const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),

    price: Joi.number()
        .required(),

    category: Joi.string()
        .min(3)
        .required(),

    stock: Joi.number()
        .max(1000),

    isAvailable: Joi.boolean(),

    createdAt: Joi.date()

});
const updateProductSchema = Joi.object({
    name: Joi.string()
        .min(3),

    price: Joi.number(),

    category: Joi.string()
        .min(3),

    stock: Joi.number()
        .max(1000),

    isAvailable: Joi.boolean(),

    createdAt: Joi.date()

}).min(1);

module.exports = { createProductSchema, updateProductSchema };