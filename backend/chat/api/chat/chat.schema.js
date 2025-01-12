const Joi = require("joi");

const createChatIdSchema = {
  source: "body",
  schema: Joi.object({
    receieverId: Joi.number().required(),
    userData: Joi.object({
      username: Joi.string().required(),
      userId: Joi.number().required(),
    }).unknown(),
  }),
};

module.exports = {
  createChatIdSchema,
};
