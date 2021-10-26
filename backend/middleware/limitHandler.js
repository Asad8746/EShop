module.exports = (req, res, next) => {
  res.status(413).send({ message: "Image must not exceed 1mb" });
};
