import mongoose from "mongoose";

const cartModel = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

export default mongoose.model("Cart", cartModel);
