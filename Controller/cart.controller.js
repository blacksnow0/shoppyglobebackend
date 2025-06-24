import cartModel from "../Model/cart.model.js";
import productsModel from "../Model/products.model.js";

export async function getCart(req, res) {
  const userId = req.userId;
  console.log("userId", userId);

  try {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log("cart", cart);
    console.log("userId", userId);

    res.status(200).json({ cart });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching the cart", error: err.message });
  }
}

export async function postCart(req, res) {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    const product = await productsModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: err.message });
  }
}

export async function updateCartQuantity(req, res) {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  console.log(userId, productId, quantity);

  try {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Error updating quantity", error: err.message });
  }
}
