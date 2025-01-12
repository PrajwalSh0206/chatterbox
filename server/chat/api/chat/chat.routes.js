const { Router } = require("express");
const { reqValidator } = require("../../middleware/req-validator");
const { createChatId } = require("./chat.controller");
const { createChatIdSchema } = require("./chat.schema");
const router = Router();

router.post("/create", reqValidator(createChatIdSchema), createChatId);

module.exports = {
  chatRouter: router,
};
