const { creatChatIdService } = require("./chat.service");

const createChatId = (req, res, next) => {
  try {
    let { logger } = req.ctx;
    logger = logger.child("Controller");
    logger.info("Entered");
    creatChatIdService(req, res, logger);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChatId,
};
