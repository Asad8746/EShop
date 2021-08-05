module.exports = (req, res) => {
  res.status(404).send({
    message: `url ${req.originalUrl} Not Found`,
  });
};
