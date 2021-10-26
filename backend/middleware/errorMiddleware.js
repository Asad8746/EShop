module.exports = function (err, req, res, next) {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(err);
  res.status(status).send({
    message:
      status !== 500 ? err.message : "Oops something goes wrong with server",
  });
};
