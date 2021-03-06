const { writeDataToFile, genId } = require("../utils");

let products = require("../data/products.json");

const findAll = () => {
  return new Promise((resolve) => {
    resolve(products);
  });
};

const findById = (id) => {
  return new Promise((resolve) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve) => {
    const newProduct = { id: genId(10), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

const update = (id, product) => {
  return new Promise((resolve) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };

    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", products);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
