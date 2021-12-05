const { deleteCache } = require("../services/cache");

module.exports = async (req, res, next) => {
  await next();
  const key = req.hKey || req.user;
  deleteCache(key);
};
