const Joi = require("joi");

const messageFetchSchema = [
  {
    source: "body",
    schema: Joi.object({
      userData: Joi.object({
        username: Joi.string().required(),
        userId: Joi.number().required(),
      }).unknown(),
    }),
  },
  {
    source: "params",
    schema: Joi.object({
      chatId: Joi.number().required(),
    }),
  },
];

module.exports = {
  messageFetchSchema,
};
