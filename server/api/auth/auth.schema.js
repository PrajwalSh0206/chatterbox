const Joi = require("joi");

const loginSchema = {
  source: "body",
  schema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  }),
};

const signUpSchema = {
  source: "body",
  schema: Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
    username: Joi.string().alphanum().min(3).max(30).required(),
  }),
};

module.exports = {
  loginSchema,
  signUpSchema,
};
