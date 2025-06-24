import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/products.route.js";
import { userRoutes } from "./Routes/user.route.js";
import { cartRouter } from "./Routes/cart.route.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shoppyGlobe");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to database");
});

db.on("error", () => {
  console.log("Error while connecting to the database");
});

app.listen("5003", () => {
  console.log("Connected to the server at port 5003");
});

app.get("/", (req, res) => {
  res.send("This is working");
});

routes(app);

userRoutes(app);

cartRouter(app);
