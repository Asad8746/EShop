const mongoose = require("mongoose");
const redis = require("redis");
const config = require("config");
const util = require("util");
const client = redis.createClient(config.get("redisURL"));
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hKey = JSON.stringify(options.key || "");
  return this;
};
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  const doc = JSON.parse(await client.hget(this.hKey, key));
  if (doc) {
    console.log("From cache");
    return Array.isArray(doc)
      ? doc.map((item) => new this.model(item))
      : new this.model(doc);
  }
  console.log("Not from cache");
  const result = await exec.apply(this, arguments);
  client.hset(this.hKey, key, JSON.stringify(result), "EX", 15);
  return result;
};

module.exports = {
  deleteCache: function (hKey) {
    client.del(JSON.stringify(hKey));
  },
};
