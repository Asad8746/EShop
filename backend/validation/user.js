const joi = require("joi");
const validateLoginBody = (body) => {
  const body_schema = joi.object({
    email: joi.string().email().required().min(2).max(255),
    password: joi.string().required().min(1).max(255),
  });
  return body_schema.validate(body);
};
const validateRegisterBody = (body) => {
  const body_schema = joi.object({
    name: joi.string().required().min(2).max(255),
    email: joi.string().email().required().min(2).max(255),
    password: joi.string().required().min(1).max(255),
  });
  return body_schema.validate(body);
};

module.exports = {
  validateLoginBody,
  validateRegisterBody,
};
