const { deleteCache } = require("../services/cache");

module.exports = async (req, res, next) => {
  await next();
  deleteCache(req.user);
};
