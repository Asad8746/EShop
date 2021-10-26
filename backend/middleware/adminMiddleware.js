module.exports = (req, res, next) => {
  if (req.isAdmin) {
    next();
    return;
  }
  res.status(401);
  throw new Error("UnAuthorized Access to private routes");
};
