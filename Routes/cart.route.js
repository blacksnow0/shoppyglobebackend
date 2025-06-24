import {
  getCart,
  postCart,
  updateCartQuantity,
} from "../Controller/cart.controller.js";
import { authenticateUser } from "../Controller/user.controller.js";

export function cartRouter(app) {
  app.get("/api/cart", authenticateUser, getCart);

  app.post("/api/cart/add-product", authenticateUser, postCart);

  app.put("/api/cart/update", authenticateUser, updateCartQuantity);
}
