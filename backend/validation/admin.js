const joi = require("joi");
const validateAssignAdminRole = (body) => {
  const body_schema = joi.object({
    isAdmin: joi.bool().required(),
  });
  return body_schema.validate(body);
};
const validateProduct = (body) => {
  const body_schema = joi.object({
    name: joi.string().required().min(2).max(255),
    description: joi.string().required().min(1).max(255),
    brand: joi.string().required().min(1).max(255),
    category: joi.string().required().min(1).max(255),
    price: joi.number().required(),
    stockCount: joi.number().required(),
  });
  return body_schema.validate(body);
};
const markOrder = (body) => {
  const body_schema = joi
    .object({
      isDelivered: joi.bool(),
      isPaid: joi.bool(),
    })
    .xor("isDelivered", "isPaid");
  return body_schema.validate(body);
};

module.exports = {
  validateAssignAdminRole,
  validateProduct,
  markOrder,
};
