const fs = require("fs");
const crypto = require("crypto");
const writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
};

const isProductUrl = (url) => url.match(/\/api\/products/);

const containsProductId = (url) =>
  url.match(/^\/api\/products\?id=([a-f\d]{10})$/);

const genId = (len) => crypto.randomBytes(Math.ceil(len / 2)).toString("hex");

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = {
  isProductUrl,
  containsProductId,
  genId,
  writeDataToFile,
  getPostData,
};
