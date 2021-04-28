const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
const {
  errorNotFound,
  errorBadRequest,
} = require("./controllers/errorController");
const { isProductUrl, containsProductId } = require("./utils");
const PORT = 5000;

const server = http.createServer((req, res) => {
  if (isProductUrl(req.url)) {
    switch (req.method) {
      case "GET":
        if (!containsProductId(req.url)) {
          getProducts(req, res);
        } else {
          const id = req.url.substr(17, 10);
          getProduct(req, res, id);
        }
        break;

      case "POST":
        if (!containsProductId(req.url)) {
          createProduct(req, res);
        } else {
          errorBadRequest(res);
        }
        break;

      case "PUT":
        if (containsProductId(req.url)) {
          const id = req.url.substr(17, 10);
          updateProduct(req, res, id);
        } else {
          errorBadRequest(res);
        }
        break;

      case "DELETE":
        if (containsProductId(req.url)) {
          const id = req.url.substr(17, 10);
          deleteProduct(req, res, id);
        } else {
          errorNotFound(res);
        }
        break;
      default:
        errorNotFound(res);
        break;
    }
  } else {
    errorNotFound(res);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
