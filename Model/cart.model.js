// cart model that contains the userId for which the cart is for
// and also contains the prodcuts with productId and the length of the products

import mongoose from "mongoose";

const cartModel = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

export default mongoose.model("Cart", cartModel);
