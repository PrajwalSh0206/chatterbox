const router = require("express").Router();
const { authRouter } = require("../api/auth/auth.routes");
const { chatRouter } = require("../api/chat/chat.routes");
const { messageRouter } = require("../api/message/message.routes");
const { authHandler } = require("../middleware/authentication");

router.use("/auth", authHandler(["/login", "/signUp"]), authRouter);
router.use("/chat", authHandler(), chatRouter);
router.use("/message", authHandler(), messageRouter);

module.exports = { router };
