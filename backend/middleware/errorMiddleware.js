module.exports = function (err, req, res, next) {
  console.log("Error message", err);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(status);
  res.status(status).send({
    message:
      status !== 500 ? err.message : "Oops something goes wrong with server",
  });
};
