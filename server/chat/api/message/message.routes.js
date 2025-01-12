const { Router } = require("express");
const { reqValidator } = require("../../middleware/req-validator");
const { messageFetchSchema } = require("./message.schema");
const { fetchMessage } = require("./message.controller");
const router = Router();

router.get("/:chatId", reqValidator(messageFetchSchema[0]), reqValidator(messageFetchSchema[1]), fetchMessage);

module.exports = {
  messageRouter: router,
};
