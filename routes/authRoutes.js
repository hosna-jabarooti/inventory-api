const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController
} = require("../controllers/authController");
const { registerSchema } = require('../validators/authValidator');
const validate = require('../middlewares/validate');

router.post('/register', validate(registerSchema), registerController);
router.post('/login', loginController);

module.exports = router;