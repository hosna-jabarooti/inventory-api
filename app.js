const express = require('express');
require('dotenv').config();
const connectDB  = require("./db");
const productRoute = require("./routes/productRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.use(productRoute);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
    //console.error(err);
});

connectDB().then(() => {
    app.listen(3025);
})

