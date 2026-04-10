const { connectDB, getDB } = require("../db");
const data = require("./products.json");

async function seed() {
    await connectDB();

    const db = getDB();
    const collection = await db.collection("products");

    await collection.deleteMany({});
    await collection.insertMany(data);

    console.log("Seed created!");
    process.exit();
}

seed(); // در واقع این فایل کاری نکرد! دستی کالکشن و دیتابیس ساختیم