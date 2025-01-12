const { STATUS_CODE } = require("../../constants/http-status");
const { findMessages } = require("../../repositories/messages");

const fetchMesageService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { chatId } = req.params;

  const condition = {
    chatId,
  };

  const chatIdExist = await findMessages(["content", "senderId", "sentAt"], condition, 10, ["sentAt", "ASC"]);
  logger.info("Chat Data", chatIdExist.length);
  if (chatIdExist.length) {
    return res.status(STATUS_CODE.OK).send({ chat: chatIdExist });
  } else {
    return res.status(STATUS_CODE.NO_CONTENT).send({ chat: [] });
  }
};

module.exports = { fetchMesageService };
