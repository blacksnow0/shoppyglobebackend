import productsModel from "../Model/products.model.js";

export async function postProduct(req, res) {
  const { title, description, price, stock } = req.body;

  try {
    const newProduct = new productsModel({
      title,
      description,
      price,
      stock,
    });

    if (!newProduct)
      return res.status(400).send("Error while adding a new product");

    await newProduct.save();

    res.send(newProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "ERror while new product was added" || err.message });
  }
}

export function fetchProduct(req, res) {
  productsModel
    .findById(req.params.id)
    .then((data) => {
      if (!data)
        return res.status(400).send("error while getting the specified user");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "Error while fetching data for specific product" || err.message,
      });
    });
}

export function fetchProducts(req, res) {
  productsModel
    .find()
    .then((data) => {
      if (!data) return res.status(400).send("error while getting data");

      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error whiel retrieving the data" || err.message });
    });
}
