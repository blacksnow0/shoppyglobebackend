import {
  fetchProducts,
  postProduct,
  fetchProduct,
} from "../Controller/products.controller.js";

export function routes(app) {
  app.post("/api/add-product", postProduct);

  app.get("/api/products", fetchProducts);

  app.get("/api/product/:id", fetchProduct);
}
