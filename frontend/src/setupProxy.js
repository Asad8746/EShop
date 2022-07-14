const { createProxyMiddleware } = require("http-proxy-middleware");

// app is express Instance that respresents react server
const proxy = (app) => {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

module.exports = proxy;
