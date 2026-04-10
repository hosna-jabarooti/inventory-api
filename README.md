# 🛒 Inventory API

A RESTful API for managing inventory products built with Node.js, Express, MongoDB, and Mongoose.

---

## 🚀 Features

- CRUD operations for products
- Filtering (category, price range, availability)
- Sorting (price)
- Pagination
- Authentication (JWT)
- Role-based access (Admin)
- Input validation (Joi)
- Error handling middleware

---

## 📦 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi

---

## ⚙️ Installation

```bash
git clone <repo-url>
cd inventory-api
npm install

---


## 🔑 Environment Variables
Create a .env file:

PORT=300
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret

🧪 Seed Data (IMPORTANT)
Before using the API, you must generate fake data:

node utils/dataGenerator.js
This will create sample products for testing.

---


## ▶️ Run the Project
npm start
or
nodemon app.js
---

## 📌 API Endpoints
Products
GET /products
GET /products/:id
POST /products (Admin)
PATCH /products/:id (Admin)
DELETE /products/:id (Admin)

Supports:
Pagination → ?page=1&limit=10
Filtering → ?category=electronics
Price range → ?minPrice=100&maxPrice=500
Sorting → ?sort=-price
---

## 🔐 Auth
Register
Login
JWT-based authentication
Protected routes with middleware


 Project Structure
controllers/
models/
routes/
services/
middlewares/
utils/

---

## 🧠 Notes
Make sure MongoDB is running
Run data generator before testing endpoints
.env file is required

👨‍💻 Author
Your Hosna Jabarooti

