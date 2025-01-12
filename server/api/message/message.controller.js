const { fetchMesageService } = require("./message.service");

const fetchMessage = (req, res, next) => {
  try {
    let { logger } = req.ctx;
    logger = logger.child("Controller");
    logger.info("Entered");
    fetchMesageService(req, res, logger);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMessage,
};
