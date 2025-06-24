// Product model that includes title, description, price and stock

import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
});

export default mongoose.model("Products", productSchema);
