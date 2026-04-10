const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),
        
    isAdmin: Joi.boolean()

});

module.exports = { registerSchema };