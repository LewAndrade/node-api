const Product = require("../models/productModel");

// @desc  Gets All Products
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
};

// @desc  Gets Single Product
// @route GET /api/products/:id
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getProducts, getProduct };
