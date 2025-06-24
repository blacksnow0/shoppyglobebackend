# shoppyglobebackend

# 🛒 ShoppyGlobe Backend

**GitHub:** [https://github.com/blacksnow0/shoppyglobebackend](https://github.com/blacksnow0/shoppyglobebackend)

This is the backend for **ShoppyGlobe**, a simple e-commerce platform built with **Node.js**, **Express**, and **MongoDB**, featuring basic authentication, product management, and cart functionality.

---

🔄 Application Flow

Product Management
Admin adds products to the product list.
Each product contains essential details like title, price, description, etc.

Cart Interaction
Users can add products to their cart from the product list.
✅ Before adding, the system checks if the product exists in the database — if not, it throws an error.

JWT-Protected Cart APIs
The following cart operations require a valid JWT token (user must be authenticated):
GET – Retrieve the current user's cart.
POST – Add a product to the cart.
PUT – Update quantity of a product in the cart.
DELETE – Remove a product from the cart.

Validation & Integrity
The cart strictly accepts only valid products.
Any attempt to add a non-existent product will result in an error.

## User Authentication & Authorization

- A minimal `User` model stores user credentials.
- JWT-based authentication is handled via a middleware function.
- `user.controller.js` manages `register` and `login` logic.
- `user.routes.js` wires up all the user routes.
- `server.js` imports and mounts the user routes.

✅ Secures cart and other routes using JWT middleware.

---

## Product Model & APIs

- A `Product` model holds basic product information (title, price, description, etc.).
- `product.controller.js` includes:
  - `GET /api/products` – fetch all products
  - `GET /api/product/:id` – fetch single product
  - `POST /api/add-products` – add a new product
- Routes are defined in `products.routes.js`.
- Integrated into the app via `server.js`.

---

## Cart Model & APIs

- The `Cart` model includes:
  - `userId`: references the user
  - `products[]`: each item contains a `productId` and its `quantity`
- `cart.controller.js` handles:
  - `GET /cart/:userId` – fetch user's cart
  - `POST /api/cart/add-product` – add a product to cart
  - `PUT /api/cart/update` – update product quantity
  - `DELETE /api/cart/remove/:productId` – remove product from cart
- All routes are defined in `cart.routes.js`.
- Routes are protected using `authenticateUser` middleware to ensure only logged-in users can access or modify cart data.

---
