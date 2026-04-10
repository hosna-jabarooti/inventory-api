const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ messaage: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET); // what contains?
        req.user = tokenPayload;
        //console.log(req.user);
        next()
    } catch (err) {
        return res.status(401).json({ messaage: "Invalid token" });  //why not using error handler?
    }
}

function verifyAccess(req, res, next) {
    const user = req.user;
    try {
        if (user.isAdmin)
            next();
        else
            throw { status: 403, message: "No access" }
    } catch (err) {
        next(err);
    }
}

module.exports = { verifyToken, verifyAccess };



