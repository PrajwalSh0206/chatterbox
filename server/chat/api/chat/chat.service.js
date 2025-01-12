const { Op } = require("sequelize");
const { STATUS_CODE } = require("../../constants/http-status");
const { findChatId, createChatId } = require("../../repositories/chats");

const creatChatIdService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { userData, receieverId } = req.body;
  const { userId } = userData;

  const condition = {
    [Op.or]: [
      {
        user1Id: receieverId,
        user2Id: userId,
      },
      {
        user1Id: userId,
        user2Id: receieverId,
      },
    ],
  };

  const chatIdExist = await findChatId(["id"], condition);

  if (chatIdExist) {
    logger.info("Chat Id Exist");
    return res.status(STATUS_CODE.OK).send({
      chatId: chatIdExist.id,
    });
  } else {
    logger.info("Chat Id Does Not Exist");
    const chat = await createChatId({
      user1Id: userId,
      user2Id: receieverId,
    });
    return res.status(STATUS_CODE.CREATED).send({
      chatId: chat.id,
    });
  }
};

module.exports = { creatChatIdService };
