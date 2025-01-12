const { STATUS_CODE } = require("../../constants/http-status");
const { findMessages } = require("../../repositories/messages");

const fetchMesageService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { chatId } = req.params;

  const condition = {
    chatId,
  };

  const chatIdExist = await findMessages(["content", "senderId", "sentAt"], condition, 10, ["sentAt", "DESC"]);
  logger.info("Chat Data", chatIdExist.length);
  if (chatIdExist.length) {
    const sortedRecords = chatIdExist.sort((a, b) => a.sentAt - b.sentAt); // Sorting ascending by createdAt
    return res.status(STATUS_CODE.OK).send({ chat: sortedRecords });
  } else {
    return res.status(STATUS_CODE.NO_CONTENT).send({ chat: [] });
  }
};

module.exports = { fetchMesageService };
