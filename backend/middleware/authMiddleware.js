const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    console.log("Token", token);
    token = token && token.startsWith("Bearer") ? token.split(" ")[1] : "";
    const decoded = jwt.verify(token, "secretKey@123");
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid Token" });
  }
};
