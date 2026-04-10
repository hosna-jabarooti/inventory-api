const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connectDB() {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
  // console.log(mongoose.connection.name); => ✅
}

module.exports = connectDB;