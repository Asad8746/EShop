const joi = require("joi");
const validateRateBody = (body) => {
  const body_schema = joi.object({
    rating: joi.number().required().min(1).max(5),
    comment: joi.string().required(),
  });
  return body_schema.validate(body);
};
module.exports = { validateRateBody };
