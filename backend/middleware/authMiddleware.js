const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    token = token && token.startsWith("Bearer") ? token.split(" ")[1] : "";
    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Token");
  }
};
