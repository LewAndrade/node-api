const errorNotFound = (res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Nothing here..." }));
};

const errorBadRequest = (res) => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Invalid Request..." }));
};

module.exports = { errorNotFound, errorBadRequest };
