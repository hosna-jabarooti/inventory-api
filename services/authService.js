const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerService(data) {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
        throw { status: 400, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        password: hashedPassword
    });
    // const userr = new User({
    //     name: data.name,
    //     email: data.email,
    //     password: hashedPassword
    // });
    // await userr.save()
    const { password, ...safeData } = user.toObject();
    return safeData;
}

async function loginService(data) {
    const user = await User.findOne({ email: data.email });

    if (!user)
        throw { status: 401, message: "Invalid credentials - no such username exists" };


    const match = await bcrypt.compare(data.password, user.password);

    if (!match)
        throw { status: 401, message: "Invalid credentials - password error" };

    const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,  //?! i haven't installed env and didn't created the file or declared such a secret
        { expiresIn: "1d" }
    );

    return { token };  // why in {}? what is token's format
}

module.exports = {
    registerService,
    loginService
};