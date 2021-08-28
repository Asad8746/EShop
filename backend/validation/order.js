const joi = require("joi");
const validateOrderBody = (body) => {
  const body_schema = joi.object({
    items: joi
      .array()
      .items({
        name: joi.string().required(),
        qty: joi.number().required(),
        id: joi.string().required(),
        price: joi.number().required(),
        image: joi.string().required(),
        stockCount: joi.number().required(),
      })
      .min(1)
      .required(),
    address: joi
      .object({
        address: joi.string().required(),
        city: joi.string().required(),
        postalCode: joi.string().required(),
        country: joi.string().required(),
      })
      .required(),
    paymentMethod: joi.string().valid("cod", "paypal").required(),
  });
  return body_schema.validate(body);
};

module.exports = {
  validateOrderBody,
};
