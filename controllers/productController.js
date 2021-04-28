const Product = require("../models/productModel");
const { getPostData } = require("../utils");

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
// @route GET /api/products
// @query id
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

// @desc  Create a Product
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);
    if (body) {
      const { title, description, price } = JSON.parse(body);

      const product = {
        title,
        description,
        price,
      };

      const newProduct = await Product.create(product);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newProduct));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  } catch (e) {
    console.log(e);
  }
};

// @desc  Edit a Product
// @route PUT /api/products
// @query id
const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (e) {
    console.log(e);
  }
};

// @desc  Delete a Product
// @route DELETE /api/products
// @query id
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
