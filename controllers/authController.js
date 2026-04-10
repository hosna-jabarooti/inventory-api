const {
    registerService,
    loginService
} = require("../services/authService");

async function registerController(req, res, next) {
    try {
        const user = await registerService(req.body);
        res.status(201).json({
            message: "user created",
            user
        });
    } catch (err) {
        next(err);
    }
}

async function loginController(req, res, next) {
    try {
        const result = await loginService(req.body);

        res.json(result); //? why show the result(token)?
    } catch (err) {
        next(err);
    }
}
module.exports = {
    registerController,
    loginController
};