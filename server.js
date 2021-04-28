const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require("./controllers/productController");
const { isProductUrl, containsProductId } = require("./utils");

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
        createProduct(req, res);
        break;

      case "PUT":
        if (containsProductId(req.url)) {
          const id = req.url.substr(17, 10);
          updateProduct(req, res, id);
        }
        break;

      default:
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Nothing here..." }));
        break;
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
